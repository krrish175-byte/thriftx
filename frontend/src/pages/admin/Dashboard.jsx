import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, ShoppingBag, DollarSign, Package } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalSales: 0,
        totalOrders: 0
    });
    const [salesData, setSalesData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pendingStories, setPendingStories] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const statsRes = await api.get('/admin/stats');
                const salesRes = await api.get('/admin/analytics/sales');
                const categoryRes = await api.get('/admin/analytics/categories');
                const storiesRes = await api.get('/stories?status=pending'); // Fetch pending

                setStats(statsRes.data);
                setPendingStories(storiesRes.data);

                // Format sales data for chart
                setSalesData(salesRes.data.map(item => ({
                    name: item._id,
                    sales: item.totalSales,
                    orders: item.count
                })));

                // Format category data for chart
                setCategoryData(categoryRes.data.map(item => ({
                    name: item._id,
                    value: item.count
                })));

                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleVerifyStory = async (id, status) => {
        try {
            await api.put(`/stories/${id}/status`, { status });
            setPendingStories(prev => prev.filter(story => story._id !== id));
            // Optional: Show success toast
        } catch (err) {
            console.error("Error verifying story", err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6 pb-24">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Overview of platform performance</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Sales"
                    value={`₹${stats.totalSales.toLocaleString()}`}
                    icon={<DollarSign className="w-8 h-8 text-green-500" />}
                    color="bg-green-100 dark:bg-green-900/20"
                />
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={<Users className="w-8 h-8 text-blue-500" />}
                    color="bg-blue-100 dark:bg-blue-900/20"
                />
                <StatCard
                    title="Total Products"
                    value={stats.totalProducts}
                    icon={<Package className="w-8 h-8 text-purple-500" />}
                    color="bg-purple-100 dark:bg-purple-900/20"
                />
                <StatCard
                    title="Pending Stories"
                    value={pendingStories.length}
                    icon={<ShoppingBag className="w-8 h-8 text-orange-500" />}
                    color="bg-orange-100 dark:bg-orange-900/20"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sales Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl md:col-span-1"
                >
                    <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Sales Overview</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                <XAxis dataKey="name" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Bar dataKey="sales" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Sales (₹)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Category Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl md:col-span-1"
                >
                    <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Product Categories</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Pending Stories Section */}
            {pendingStories.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
                >
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                        Pending Stories ({pendingStories.length})
                    </h3>
                    <div className="space-y-4">
                        {pendingStories.map(story => (
                            <div key={story._id} className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 gap-4">
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{story.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{story.description}</p>
                                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400 uppercase tracking-widest font-bold">
                                        <span>BY {story.author}</span>
                                        <span>• {story.readTime}</span>
                                        <span>• {story.content.split(' ').length} WORDS</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleVerifyStory(story._id, 'approved')}
                                        className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors shadow-lg shadow-green-900/20"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleVerifyStory(story._id, 'rejected')}
                                        className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition-colors shadow-lg shadow-red-900/20"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
            </div>
            <div className={`p-4 rounded-xl ${color}`}>
                {icon}
            </div>
        </div>
    </motion.div>
);

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Package, Clock, ShieldCheck, DollarSign, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const res = await api.get('/auth/me');
            setUser(res.data);
            fetchDashboardData(res.data._id);
        } catch (err) {
            console.error('Error fetching profile:', err);
            navigate('/login');
        }
    };

    const [activeFilter, setActiveFilter] = useState('ALL');

    const fetchDashboardData = async (userId) => {
        try {
            const [productsRes, incomingRes, myOrdersRes] = await Promise.all([
                api.get(`/products?seller=${userId}&status=all`),
                api.get('/orders/incoming'),
                api.get('/orders/my-orders')
            ]);

            setListings(productsRes.data);
            setSales(incomingRes.data);
            setPurchases(myOrdersRes.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                await api.delete(`/products/${id}`);
                setListings(listings.filter(item => item._id !== id));
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Failed to delete product');
            }
        }
    };

    // Computed Stats
    const stats = {
        totalOrders: sales.length + purchases.length,
        itemsSold: sales.filter(o => o.status === 'completed' || o.paymentStatus === 'released').length,
        activeListings: listings.filter(i => i.status === 'active').length,
        impactScore: (listings.length * 10) + (sales.length * 50)
    };

    const filteredListings = listings.filter(item => {
        if (activeFilter === 'ALL') return true;
        if (activeFilter === 'PENDING') return item.status === 'pending';
        if (activeFilter === 'ACTIVE') return item.status === 'active';
        if (activeFilter === 'REJECTED') return item.status === 'rejected' || item.status === 'removed';
        if (activeFilter === 'CLOSED') return item.status === 'closed' || item.status === 'sold';
        return true;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    if (!user) return null;

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        let cleanPath = path.replace(/\\/g, '/');
        if (cleanPath.startsWith('/')) cleanPath = cleanPath.substring(1);

        // Use the API URL base for images
        const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.split('/api')[0] : 'http://localhost:5001';
        return `${baseUrl}/${cleanPath}`;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-white shadow-sm border border-slate-100 p-1">
                            <div className="w-full h-full rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center border border-slate-50">
                                {user.picture ? (
                                    <img src={getImageUrl(user.picture)} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-2xl font-bold text-slate-300">{user.name?.charAt(0)}</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Welcome, {user.name}</h1>
                            <p className="text-slate-500 mt-1">{user.email}</p>
                        </div>
                    </div>
                    {user.isVerifiedStudent ? (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                            <ShieldCheck size={16} /> Verified Student
                        </span>
                    ) : (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                            Student Verification Pending
                        </span>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Orders', value: stats.totalOrders, icon: Package, color: 'bg-blue-50 text-blue-600' },
                        { label: 'Items Sold', value: stats.itemsSold, icon: DollarSign, color: 'bg-green-50 text-green-600' },
                        { label: 'Active Listings', value: stats.activeListings, icon: Clock, color: 'bg-orange-50 text-orange-600' },
                        { label: 'Impact Score', value: stats.impactScore, icon: ShieldCheck, color: 'bg-indigo-50 text-indigo-600' }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">{stat.label}</p>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area - Dark Themed as requested */}
                <div className="bg-[#0f1115] rounded-3xl shadow-xl overflow-hidden min-h-[500px] flex flex-col p-8">
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-4 mb-10">
                        {['ALL', 'PENDING', 'ACTIVE', 'REJECTED', 'CLOSED'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeFilter === filter
                                    ? 'bg-white text-[#2563eb] shadow-lg scale-105'
                                    : 'bg-[#1a1d23] text-[#2563eb] hover:bg-[#252a33] opacity-80'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Listings List */}
                    <div className="space-y-4">
                        {filteredListings.length > 0 ? (
                            filteredListings.map((item) => (
                                <div key={item._id} className="bg-transparent border border-slate-800/50 p-6 rounded-xl flex items-center hover:bg-white/[0.02] transition-colors group">
                                    <div className="w-16 h-16 bg-slate-800/50 rounded-lg overflow-hidden shrink-0 border border-slate-700/50">
                                        {item.images && item.images[0] ? (
                                            <img src={getImageUrl(item.images[0])} alt={item.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <Package className="w-full h-full p-4 text-slate-600" />
                                        )}
                                    </div>
                                    <div className="flex-1 ml-6">
                                        <h3 className="font-bold text-white text-lg">{item.title}</h3>
                                        <p className="text-sm text-slate-400 mt-1">{item.category} • {item.condition}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right mr-4">
                                            <p className="font-bold text-white text-lg">₹{item.price}</p>
                                            <span className={`text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded ${item.status === 'active' ? 'text-green-500' :
                                                item.status === 'pending' ? 'text-yellow-500' :
                                                    item.status === 'sold' || item.status === 'closed' ? 'text-blue-500' : 'text-red-500'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="text-[#ff4444] hover:text-red-400 font-bold text-xs uppercase tracking-widest transition-colors"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => navigate(`/product/${item._id}`)}
                                                className="text-[#4dabf7] hover:text-blue-400 font-bold text-xs uppercase tracking-widest transition-colors"
                                            >
                                                VIEW
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 py-20 bg-[#161920]/50 rounded-2xl border border-dashed border-slate-800">
                                <Package size={48} className="mb-4 opacity-10" />
                                <p className="font-medium">No {activeFilter.toLowerCase()} items found.</p>
                                <p className="text-sm opacity-60">Try changing your filter or add new listings.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


import React from 'react';
import Navbar from '../components/Navbar';
import { Package, Clock, ShieldCheck, DollarSign } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Verified Student</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Orders', value: '12', icon: Package, color: 'bg-blue-50 text-blue-600' },
                        { label: 'Items Sold', value: '5', icon: DollarSign, color: 'bg-green-50 text-green-600' },
                        { label: 'Pending Delivery', value: '2', icon: Clock, color: 'bg-orange-50 text-orange-600' },
                        { label: 'Impact Score', value: '850', icon: ShieldCheck, color: 'bg-indigo-50 text-indigo-600' }
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

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {[1, 2, 3].map((order) => (
                            <div key={order} className="p-6 flex items-center justify-between hover:bg-slate-50 transition">
                                <div className="flex items-center">
                                    <div className="w-16 h-16 bg-slate-100 rounded-lg mr-4"></div>
                                    <div>
                                        <p className="font-bold text-slate-900">Order #{1000 + order}</p>
                                        <p className="text-sm text-slate-500">Vintage Jacket • ₹1,200</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-semibold mb-1">In Transit</span>
                                    <p className="text-xs text-slate-400">Arriving tomorrow</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

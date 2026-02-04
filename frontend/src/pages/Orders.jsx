import React from 'react';
import { Package } from 'lucide-react';

const Orders = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No orders yet. Start shopping to see your order history here!</p>
                </div>
            </div>
        </div>
    );
};

export default Orders;

import React from 'react';
import { Heart } from 'lucide-react';

const Wishlist = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Your wishlist is empty. Browse products and add items you love!</p>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;

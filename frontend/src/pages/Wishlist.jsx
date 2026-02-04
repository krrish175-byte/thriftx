import React, { useState, useEffect } from 'react';
import { Heart, Loader } from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const res = await api.get('/auth/wishlist');
            setWishlist(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching wishlist:', err);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center">
                <Loader className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#121212] py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 bg-red-500/10 rounded-2xl">
                        <Heart className="text-red-500" size={28} fill="currentColor" />
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">My Wishlist</h1>
                </div>

                {wishlist.length === 0 ? (
                    <div className="bg-[#1a1a1a] rounded-[2rem] border border-white/5 p-16 text-center shadow-xl">
                        <Heart size={64} className="mx-auto text-gray-800 mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                            Browse our curated collections and save items you love to find them later.
                        </p>
                        <a href="/products" className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-900/20 font-heading tracking-widest text-xs uppercase">
                            Explore Collections
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlist.map(product => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onToggleWishlist={(id, isWishlisted) => {
                                    if (!isWishlisted) {
                                        setWishlist(prev => prev.filter(p => p._id !== id));
                                    }
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;

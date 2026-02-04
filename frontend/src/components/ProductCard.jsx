import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import api from '../services/api';

const ProductCard = ({ product, onToggleWishlist }) => {
    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && product.likes) {
            setIsWishlisted(product.likes.includes(user.id || user._id));
        }
    }, [product]);

    const handleWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }

        // Handle dummy products (IDs like '1', '2' from Home page)
        if (product._id && product._id.length < 10) {
            setIsWishlisted(!isWishlisted);
            return;
        }

        setLoading(true);
        try {
            const res = await api.post(`/auth/wishlist/${product._id}`);
            setIsWishlisted(res.data.isWishlisted);
            if (onToggleWishlist) onToggleWishlist(product._id, res.data.isWishlisted);
        } catch (err) {
            console.error('Error toggling wishlist:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }

        // Navigate to checkout with this product in state
        navigate('/checkout', { state: { product } });
    };
    // Helper to get image URL
    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/400x600?text=No+Image';
        if (path.startsWith('http')) return path;
        if (path.startsWith('/assets/')) return path; // Serve local public assets directly
        let cleanPath = path.replace(/\\/g, '/');
        if (cleanPath.startsWith('/')) cleanPath = cleanPath.substring(1);
        const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.split('/api')[0] : 'http://localhost:5001';
        return `${baseUrl}/${cleanPath}`;
    };

    const discount = product.originalPrice && product.originalPrice > product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all shadow-lg"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <Link to={`/product/${product._id}`}>
                    <img
                        src={getImageUrl(product.images[0])}
                        alt={product.title}
                        className="w-full h-full object-cover brightness-90 group-hover:brightness-110 transition-all duration-700"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400x600?text=Image+Unavailable';
                        }}
                    />
                </Link>

                {/* Sale Badge */}
                {discount && (
                    <span className="absolute top-3 left-3 bg-red-600 text-[10px] font-bold px-2 py-1 rounded-full text-white shadow-lg z-10">
                        {discount}% OFF
                    </span>
                )}

                {/* Condition Badge */}
                {product.condition === 'Brand New' && (
                    <span className="absolute top-3 right-3 bg-blue-600 text-[10px] font-bold px-2 py-1 rounded-full text-white shadow-lg z-10 uppercase tracking-tighter">
                        New
                    </span>
                )}

                {/* Quick Actions (Keeping these as they add premium feel) */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={handleWishlist}
                        disabled={loading}
                        className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${isWishlisted
                            ? 'bg-red-500 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                            : 'bg-white/10 border-white/10 text-white hover:bg-red-500/20 hover:border-red-500/50'
                            }`}
                    >
                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} className={loading ? 'animate-pulse' : ''} />
                    </motion.button>
                    <button
                        onClick={handleCart}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-600 transition-all font-bold"
                    >
                        <ShoppingBag size={18} />
                    </button>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-4 bg-[#1a1a1a]">
                <p className="text-xs text-blue-400 uppercase tracking-widest font-bold mb-1">
                    {product.brand || 'Thrift Find'}
                </p>
                <Link to={`/product/${product._id}`}>
                    <h4 className="text-white font-medium mt-1 truncate hover:text-blue-400 transition-colors">
                        {product.title}
                    </h4>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-xl font-bold text-white">₹{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

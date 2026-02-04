import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
    // Helper to get image URL (same as used in other pages for consistency)
    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/400x600?text=No+Image';
        if (path.startsWith('http')) return path;
        let cleanPath = path.replace(/\\/g, '/');
        if (cleanPath.startsWith('/')) cleanPath = cleanPath.substring(1);
        const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.split('/api')[0] : 'http://localhost:5001';
        return `${baseUrl}/${cleanPath}`;
    };

    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-transparent hover:border-slate-100">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                <Link to={`/product/${product._id}`}>
                    <img
                        src={getImageUrl(product.images[0])}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400x600?text=Image+Unavailable';
                        }}
                    />
                </Link>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.condition === 'Brand New' && (
                        <span className="px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-tighter rounded-full shadow-lg">
                            Pristine
                        </span>
                    )}
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-tighter rounded-full shadow-lg">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                        </span>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 flex flex-col gap-2">
                    <button className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                        <Heart size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center text-slate-400 hover:text-blue-500 transition-colors">
                        <ShoppingBag size={18} />
                    </button>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">
                            {product.brand || 'Premium Thrift'}
                        </p>
                        <Link to={`/product/${product._id}`}>
                            <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                                {product.title}
                            </h3>
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xl font-black text-slate-900">₹{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-slate-400 line-through font-medium">₹{product.originalPrice}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

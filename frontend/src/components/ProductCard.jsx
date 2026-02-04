import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
                <Link to={`/product/${product._id}`}>
                    <img
                        src={product.images[0] || 'https://via.placeholder.com/400x600?text=No+Image'}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                </Link>
                {product.condition === 'Brand New' && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm text-primary text-[10px] uppercase font-bold tracking-wider">
                        New
                    </span>
                )}
                <button className="absolute top-2 right-2 p-2 bg-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-red-500">
                    <Heart size={20} className="drop-shadow-md" />
                </button>
            </div>

            <div className="flex justify-between items-start space-x-4">
                <div className="flex-1">
                    <Link to={`/product/${product._id}`}>
                        <h3 className="text-sm font-medium text-primary leading-tight group-hover:underline decoration-1 underline-offset-4">
                            {product.title}
                        </h3>
                    </Link>
                    <p className="text-xs text-neutral-500 mt-1 capitalize">{product.brand || 'Thrift Find'}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-primary">₹{product.price}</p>
                    {product.originalPrice && (
                        <p className="text-xs text-neutral-400 line-through">₹{product.originalPrice}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

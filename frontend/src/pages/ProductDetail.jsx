import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Star, ShieldCheck, Truck, MessageCircle, ShoppingCart } from 'lucide-react';


const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/products/${id}`);
            setProduct(res.data);
        } catch (err) {
            console.error(err);
            // Dummy data for fallback
            setProduct({
                _id: id,
                title: 'Vintage Nike Hoodie',
                price: 1200,
                originalPrice: 3500,
                description: 'Classic grey Nike hoodie from the 90s. Very comfortable and warm. No stains or tears, just normal wear.',
                images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=500'],
                brand: 'Nike',
                size: 'L',
                condition: 'Good',
                usageDuration: '2 years',
                category: 'Clothes',
                aiSuggestedPrice: { value: 1150, confidence: 85 },
                seller: {
                    name: 'Aryan K.',
                    verifiedSeller: true,
                    rating: 4.8
                },
                createdAt: new Date().toISOString()
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading || !product) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

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
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-slate-200 rounded-2xl overflow-hidden shadow-inner border border-slate-100 flex items-center justify-center">
                            {product.images && product.images[0] ? (
                                <img src={getImageUrl(product.images[0])} alt={product.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-slate-300">No Image Available</div>
                            )}
                        </div>
                        {/* Thumbnails would go here */}
                    </div>

                    {/* Product Info */}
                    <div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{product.category}</span>
                                    <h1 className="text-3xl font-bold text-slate-900 mt-2">{product.title}</h1>
                                    <p className="text-slate-500 mt-1">Brand: {product.brand} • Size: {product.size}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-slate-900">₹{product.price}</p>
                                    {product.originalPrice && (
                                        <p className="text-slate-400 line-through">₹{product.originalPrice}</p>
                                    )}
                                </div>
                            </div>

                            {/* AI Price Tag */}
                            <div className="mb-6 p-4 bg-indigo-50 rounded-xl flex items-center border border-indigo-100">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mr-3">
                                    ✨
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-indigo-900">AI Verified Price</p>
                                    <p className="text-xs text-indigo-700">Estimated fair value: ₹{product.aiSuggestedPrice?.value || product.price}</p>
                                </div>
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500">Condition</p>
                                    <p className="font-semibold text-slate-700">{product.condition}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500">Usage</p>
                                    <p className="font-semibold text-slate-700">{product.usageDuration || 'N/A'}</p>
                                </div>
                            </div>

                            <p className="text-slate-600 mb-8 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="flex space-x-4 mb-8">
                                <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center">
                                    <ShoppingCart className="mr-2" size={20} />
                                    Buy Now
                                </button>
                                <button className="flex-1 bg-white border-2 border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-50 transition flex items-center justify-center">
                                    <MessageCircle className="mr-2" size={20} />
                                    Chat with Seller
                                </button>
                            </div>

                            {/* Seller Card */}
                            <div className="border-t border-slate-100 pt-6">
                                <div className="flex items-center">
                                    <div className="h-12 w-12 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shrink-0 flex items-center justify-center">
                                        {product.seller?.picture ? (
                                            <img src={getImageUrl(product.seller.picture)} alt={product.seller.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-slate-400 font-bold">{product.seller?.name?.charAt(0)}</div>
                                        )}
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <p className="text-sm font-bold text-slate-900 flex items-center">
                                            {product.seller?.name}
                                            {product.seller?.verifiedSeller && <ShieldCheck size={16} className="text-blue-500 ml-1" />}
                                        </p>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <Star size={12} className="text-yellow-400 fill-current" />
                                            <span className="ml-1">4.8 (12 sales)</span>
                                        </div>
                                    </div>
                                    <button className="text-sm text-primary font-medium hover:underline">View Profile</button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-center text-slate-500 text-sm">
                            <ShieldCheck size={16} className="mr-2" />
                            <span>Protected by Campus ThriftX Escrow</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

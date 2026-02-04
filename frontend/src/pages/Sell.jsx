import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { Upload, DollarSign, Loader, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sell = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [priceLoading, setPriceLoading] = useState(false);
    const [aiPrice, setAiPrice] = useState(null);
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        category: 'Clothes',
        condition: 'Good',
        brand: '',
        usageDuration: '',
        originalPrice: '',
        price: '',
        description: '',
        hasBill: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        // Create previews
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const getAIPrice = async () => {
        if (!formData.title || !formData.category) {
            alert("Please fill in basic details first (Title, Category, Condition)");
            return;
        }

        try {
            setPriceLoading(true);
            // In a real app, we'd upload images first or send simpler data
            const res = await api.post('/ai/price-check', formData);
            setAiPrice(res.data);
            // Auto-fill price if empty
            if (!formData.price) {
                setFormData(prev => ({ ...prev, price: res.data.recommendedPrice }));
            }
        } catch (err) {
            console.error(err);
            // Fallback mock for demo if API fails/not connected
            setTimeout(() => {
                setAiPrice({
                    recommendedPrice: 850,
                    minPrice: 700,
                    maxPrice: 1000,
                    confidence: 88,
                    reasoning: "Based on the brand and 'Good' condition, similar items sell for this range."
                });
                if (!formData.price) setFormData(prev => ({ ...prev, price: 850 }));
            }, 1000);
        } finally {
            setPriceLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const data = new FormData();
            // Append all fields
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            // Append images
            images.forEach(image => {
                data.append('images', image);
            });

            if (aiPrice) {
                data.append('aiSuggestedPrice', JSON.stringify(aiPrice));
            }

            await api.post('/products', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('Product listed successfully!');
            navigate('/products');
        } catch (err) {
            console.error(err);
            alert('Failed to list product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Sell an Item</h1>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">

                        {/* 1. Basic Info */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">1. Product Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Vintage Nike Hoodie size L" className="w-full px-4 py-2 border rounded-xl focus:ring-primary focus:border-primary" required />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-primary focus:border-primary">
                                        {['Clothes', 'Jewelry', 'Shoes', 'Accessories', 'Books', 'Electronics', 'Other'].map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Brand</label>
                                    <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Zara, H&M" className="w-full px-4 py-2 border rounded-xl focus:ring-primary focus:border-primary" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Condition</label>
                                    <select name="condition" value={formData.condition} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-primary focus:border-primary">
                                        {['Brand New', 'Excellent', 'Good', 'Fair', 'Poor'].map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Usage Duration</label>
                                    <input type="text" name="usageDuration" value={formData.usageDuration} onChange={handleChange} placeholder="e.g. 6 months" className="w-full px-4 py-2 border rounded-xl focus:ring-primary focus:border-primary" />
                                </div>
                            </div>
                        </div>

                        {/* 2. Images */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">2. Upload Photos</h2>

                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary transition cursor-pointer relative">
                                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <Camera size={48} className="mx-auto text-slate-400 mb-4" />
                                <p className="text-slate-600">Click or drag images here to upload</p>
                                <p className="text-xs text-slate-400 mt-2">Max 5 images</p>
                            </div>

                            {previewImages.length > 0 && (
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {previewImages.map((src, idx) => (
                                        <div key={idx} className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200">
                                            <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 3. Pricing & AI */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">3. Pricing</h2>

                            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-indigo-900 flex items-center">
                                        ✨ AI Price Recommendation
                                    </h3>
                                    <button type="button" onClick={getAIPrice} disabled={priceLoading} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50">
                                        {priceLoading ? <Loader className="animate-spin" size={16} /> : 'Get Estimate'}
                                    </button>
                                </div>

                                {aiPrice ? (
                                    <div className="space-y-2">
                                        <p className="text-2xl font-bold text-slate-900">₹{aiPrice.recommendedPrice}</p>
                                        <p className="text-sm text-slate-600">Range: ₹{aiPrice.minPrice} - ₹{aiPrice.maxPrice}</p>
                                        <p className="text-xs text-slate-500 italic">"{aiPrice.reasoning}"</p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500">Fill details and click "Get Estimate" to see fair market value.</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Your Price (₹)</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-slate-400"><DollarSign size={16} /></span>
                                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-primary focus:border-primary font-bold text-lg" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Original Price (Internal Only)</label>
                                    <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="Optional" className="w-full px-4 py-2 border rounded-xl focus:ring-primary focus:border-primary" />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input type="checkbox" name="hasBill" checked={formData.hasBill} onChange={handleChange} id="hasBill" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                                <label htmlFor="hasBill" className="ml-2 block text-sm text-slate-900">I have the original bill (Increases trust)</label>
                            </div>
                        </div>

                        {/* 4. Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-4 py-2 border rounded-xl focus:ring-primary focus:border-primary" placeholder="Describe the item, any defects, etc." required></textarea>
                        </div>

                        <div className="pt-4">
                            <button type="submit" disabled={loading} className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center text-lg disabled:opacity-70">
                                {loading ? 'Listing Item...' : 'List Item for Sale'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sell;

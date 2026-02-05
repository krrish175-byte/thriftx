import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Send, ChevronLeft, Type, FileText, Tag, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubmitStory = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'CAMPUS CULTURE'
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const categories = ['CAMPUS CULTURE', 'SUSTAINABILITY', 'STYLE HACKS', 'COMMUNITY', 'CIRCULAR VISION'];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('excerpt', formData.excerpt);
        data.append('content', formData.content);
        data.append('category', formData.category);
        data.append('image', image);

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5001/api/blogs', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token
                }
            });
            navigate('/blog');
        } catch (err) {
            console.error('Error submitting story:', err);
            alert(err.response?.data?.msg || 'Failed to submit story. Please make sure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#121212] min-h-screen text-white font-sans py-24 px-6 lg:px-20">
            <div className="max-w-4xl mx-auto">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/blog')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Ledger</span>
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-5xl lg:text-7xl font-bold mb-4 tracking-tighter">
                        Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 italic font-serif">Narrative</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-16 max-w-2xl leading-relaxed">
                        Contribute to the Campus Ledger. Your stories about sustainability, style, and campus life inspire the next generation of thrifters.
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Image Upload Area */}
                    <div className="group relative">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-4">Cover Photograph</label>
                        <div
                            className={`relative h-[400px] rounded-[3rem] border-2 border-dashed transition-all overflow-hidden flex flex-col items-center justify-center cursor-pointer
                                ${preview ? 'border-transparent' : 'border-white/10 hover:border-blue-500/50 bg-white/5'}`}
                            onClick={() => document.getElementById('image-upload').click()}
                        >
                            {preview ? (
                                <>
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="text-white" size={48} />
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-12">
                                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        <Camera className="text-blue-400" size={32} />
                                    </div>
                                    <p className="text-white font-bold text-lg mb-2">Upload visual context</p>
                                    <p className="text-gray-500 text-sm">PNG, JPG or WebP (Max 5MB)</p>
                                </div>
                            )}
                        </div>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Title */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">
                                <Type size={14} className="text-blue-400" /> Dispatch Title
                            </label>
                            <input
                                type="text"
                                placeholder="The Midnight Hand-off..."
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 focus:outline-none focus:border-blue-500 transition-all text-xl font-bold"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">
                                <Tag size={14} className="text-blue-400" /> Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 focus:outline-none focus:border-blue-500 transition-all text-lg font-bold appearance-none cursor-pointer"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="bg-[#1a1a1a]">{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">
                            <FileText size={14} className="text-blue-400" /> Brief Synopsis (Optional)
                        </label>
                        <textarea
                            placeholder="Provide a short hook to engage your readers..."
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 focus:outline-none focus:border-blue-500 transition-all h-32 resize-none"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">
                            <FileText size={14} className="text-blue-400" /> The Full Narrative
                        </label>
                        <textarea
                            placeholder="Dive into your experience..."
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] px-8 py-8 focus:outline-none focus:border-blue-500 transition-all h-96 resize-none leading-relaxed text-lg"
                            required
                        />
                    </div>

                    <div className="pt-12">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-full shadow-2xl shadow-blue-900/40 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} /> Transmitting story...
                                </>
                            ) : (
                                <>
                                    <Send size={20} /> Submit Dispatch
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitStory;

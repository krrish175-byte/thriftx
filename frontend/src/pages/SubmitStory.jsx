import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Link as LinkIcon, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const SubmitStory = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        coverImage: '',
        additionalImages: '',
        author: '',
        tags: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Word Count Validation
            const wordCount = formData.content.trim().split(/\s+/).length;
            if (wordCount < 200) {
                setLoading(false);
                setMessage(`Story is too short (${wordCount} words). Minimum 200 words required.`);
                return;
            }

            // Process comma-separated lists
            const payload = {
                ...formData,
                additionalImages: formData.additionalImages.split(',').filter(url => url.trim())
            };

            await api.post('/stories', payload);
            setMessage('Story submitted successfully! Redirecting...');
            setTimeout(() => navigate('/blog'), 2000);
        } catch (err) {
            console.error('Submission error:', err);
            const errorMsg = err.response?.data?.message || err.message || 'Error submitting story.';
            setMessage(`Error: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#121212] min-h-screen text-white font-sans pt-24 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <Link to="/blog" className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Campus Ledger
                </Link>

                <h1 className="text-4xl md:text-5xl font-black mb-4">Submit Your Story</h1>
                <p className="text-xl text-gray-400 mb-12">Share your campus experiences, thrift finds, and sustainability hacks.</p>

                {message && (
                    <div className={`p-4 rounded-lg mb-8 ${message.includes('success') ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="space-y-6 bg-[#1a1a1a] p-8 rounded-[2rem] border border-white/5">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-blue-400">The Basics</h2>

                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Headline</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="e.g., How I Found Vintage Levis on Campus"
                                className="w-full bg-[#121212] text-white p-4 rounded-xl border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Short Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="2"
                                placeholder="A catchy summary of your story..."
                                className="w-full bg-[#121212] text-white p-4 rounded-xl border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Author Name</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                                placeholder="Your Name or Alias"
                                className="w-full bg-[#121212] text-white p-4 rounded-xl border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Tags (comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="Fashion, Sustainability, Campus Life"
                                className="w-full bg-[#121212] text-white p-4 rounded-xl border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 bg-[#1a1a1a] p-8 rounded-[2rem] border border-white/5">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-purple-400">The Story</h2>

                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Full Content</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows="10"
                                placeholder="Write your full story here..."
                                className="w-full bg-[#121212] text-white p-4 rounded-xl border border-white/10 focus:border-blue-500 focus:outline-none transition-colors leading-relaxed"
                            />
                        </div>
                    </div>

                    {/* Media */}
                    <div className="space-y-6 bg-[#1a1a1a] p-8 rounded-[2rem] border border-white/5">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-pink-400">Media & Links</h2>

                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Cover Image URL</label>
                            <div className="relative">
                                <Upload size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="url"
                                    name="coverImage"
                                    value={formData.coverImage}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full bg-[#121212] text-white pl-12 pr-4 py-4 rounded-xl border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Additional Images (Comma separated URLs)</label>
                            <textarea
                                name="additionalImages"
                                value={formData.additionalImages}
                                onChange={handleChange}
                                rows="2"
                                placeholder="https://image1.jpg, https://image2.jpg"
                                className="w-full bg-[#121212] text-white p-4 rounded-xl border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        type="submit"
                        className="w-full bg-white text-black font-black uppercase tracking-widest py-6 rounded-xl hover:bg-gray-200 transition-colors shadow-2xl flex items-center justify-center gap-3 text-lg"
                    >
                        {loading ? 'Publishing...' : <><Send size={20} /> Publish Story</>}
                    </motion.button>
                </form>
            </div>
        </div>
    );
};

export default SubmitStory;

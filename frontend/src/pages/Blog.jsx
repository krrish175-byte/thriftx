import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, User, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

// Reusable LiftedCard component
const LiftedCard = ({ children, className }) => (
    <motion.div
        whileHover={{
            y: -15,
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.15)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`bg-[#1a1a1a] rounded-[2.5rem] p-8 overflow-hidden shadow-2xl border border-white/5 ${className}`}
    >
        {children}
    </motion.div>
);

const Blog = () => {
    const [communityStories, setCommunityStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    // States for featured article simulated interaction
    const [featuredLikes, setFeaturedLikes] = useState(24);
    const [isFeaturedLiked, setIsFeaturedLiked] = useState(false);

    const featuredArticle = {
        category: "FEATURED DISPATCH",
        title: "How Thrift Shopping Saved Me ₹5000 This Semester",
        excerpt: "A second-year engineering student shares how strategic thrifting helped fund their study abroad trip and redefined their campus style.",
        author: "Priya Sharma",
        date: "May 24, 2024",
        readTime: "4 min read",
        imageUrl: "/assets/blog/featured_saving.png",
        likes: [],
    };

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await api.get('/stories');
                setCommunityStories(res.data);
            } catch (err) {
                console.error("Failed to fetch stories", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    const handleLike = async (blogId) => {
        if (!user) {
            alert('Please login to like stories');
            return;
        }

        try {
            const res = await api.put(`/stories/${blogId}/like`);
            // Update state locally
            setCommunityStories(prev => prev.map(blog =>
                blog._id === blogId ? { ...blog, likes: res.data } : blog
            ));
        } catch (err) {
            console.error("Error liking blog:", err);
        }
    };

    // Fallback static data if no API data yet, combined with API data
    const displayStories = communityStories.length > 0 ? communityStories : [
        {
            _id: "static1",
            category: "CIRCULAR VISION",
            title: "Size Guide Secrets: Finding Perfect Fits on Campus Thrift",
            authorName: "Rahul Gupta",
            date: "May 20, 2024",
            readTime: "5 min read",
            imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2000&auto=format&fit=crop",
            likes: [],
        },
        // Additional static stories can be added here
    ];

    return (
        <div className="bg-[#121212] min-h-screen text-white font-sans">
            {/* Hero Section */}
            <section className="relative h-[450px] flex items-center px-6 lg:px-20 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
                    style={{ backgroundImage: "url('/assets/blog/hero.png')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/70 to-transparent"></div>
                <div className="relative z-10 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-sm uppercase tracking-[0.2em] text-blue-400 font-bold mb-4">THE CAMPUS LEDGER</p>
                        <h1 className="text-6xl lg:text-8xl font-bold leading-none mb-6 text-white tracking-tight">
                            Stories from <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Campus Culture
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                            Sustainable fashion tips, thrift culture stories, and insights from the student community at ThriftX.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Featured Dispatch Section */}
            <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
                <h2 className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mb-12 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-gray-800"></span> FEATURED DISPATCH
                </h2>
                <LiftedCard className="!rounded-[3rem] p-0 shadow-2xl border border-white/10 group">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className="md:col-span-1 lg:col-span-2 relative min-h-[400px] overflow-hidden">
                            <img
                                src={featuredArticle.imageUrl}
                                alt={featuredArticle.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-75 group-hover:brightness-100"
                            />
                        </div>
                        <div className="md:col-span-1 lg:col-span-1 p-10 md:p-12 flex flex-col justify-between bg-[#1a1a1a]">
                            <div>
                                <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">{featuredArticle.category}</span>
                                <h3 className="text-3xl font-bold leading-tight mt-4 text-white group-hover:text-blue-400 transition-colors">{featuredArticle.title}</h3>
                                <p className="text-gray-400 mt-6 leading-relaxed text-lg">{featuredArticle.excerpt}</p>
                            </div>
                            <div className="mt-10 pt-8 border-t border-white/5">
                                <div className="flex items-center text-gray-500 text-sm mb-6">
                                    <div className="flex items-center">
                                        <User size={16} className="mr-2 text-blue-400" /> <span>{featuredArticle.author}</span>
                                    </div>
                                    <div className="flex items-center ml-6">
                                        <Clock size={16} className="mr-2 text-blue-400" /> <span>{featuredArticle.readTime}</span>
                                    </div>
                                    <div className="flex items-center ml-auto">
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => {
                                                setIsFeaturedLiked(!isFeaturedLiked);
                                                setFeaturedLikes(prev => isFeaturedLiked ? prev - 1 : prev + 1);
                                            }}
                                            className={`flex items-center gap-2 transition-colors ${isFeaturedLiked ? 'text-rose-500' : 'text-gray-500 hover:text-rose-400'}`}
                                        >
                                            <Heart size={20} fill={isFeaturedLiked ? "currentColor" : "none"} />
                                            <span className="font-bold">{featuredLikes} Likes</span>
                                        </motion.button>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    onClick={() => alert('Developing the immersive story viewer... Stay tuned!')}
                                    className="flex items-center gap-3 text-white font-bold group/btn py-3 px-6 bg-blue-600 rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 w-fit"
                                >
                                    Enter the Narrative <ChevronRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </LiftedCard>
            </section>

            {/* Community Dispatches Section */}
            <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                    <h2 className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-gray-800"></span> COMMUNITY DISPATCHES
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {['ALL', 'SUSTAINABILITY', 'FASHION', 'CAMPUS'].map(tag => (
                            <button
                                key={tag}
                                className={`px-6 py-2.5 text-xs font-bold rounded-full border transition-all tracking-widest ${tag === 'ALL'
                                    ? 'bg-white text-[#121212] border-white shadow-lg'
                                    : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayStories.map((article, index) => (
                        <LiftedCard key={index} className="flex flex-col group !p-0 bg-transparent border-none shadow-none hover:shadow-none !translate-y-0 hover:!translate-y-[-10px]">
                            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 border border-white/5">
                                <img
                                    src={article.coverImage || article.imageUrl}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-90 group-hover:brightness-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-6 left-6">
                                    <span className="px-3 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-tighter rounded-full text-white">
                                        {(article.category || 'COMMUNITY').split(' ')[0]}
                                    </span>
                                </div>
                                {article._id && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (window.confirm('Are you sure you want to delete this story?')) {
                                                api.delete(`/stories/${article._id}`)
                                                    .then(() => {
                                                        setCommunityStories(prev => prev.filter(s => s._id !== article._id));
                                                    })
                                                    .catch(err => console.error(err));
                                            }
                                        }}
                                        className="absolute top-4 right-4 p-2 bg-red-600/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                                        title="Delete Story"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                    </button>
                                )}
                            </div>
                            <div className="px-2">
                                <h4 className="text-2xl font-bold leading-snug text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{article.title}</h4>
                                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-gray-500 tracking-[0.1em] uppercase">
                                    <div className="flex items-center">
                                        <User size={12} className="mr-2 text-blue-400" /> <span>{article.author}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock size={12} className="mr-2 text-blue-400" /> <span>{article.readTime}</span>
                                    </div>
                                </div>
                                <Link
                                    to={`/blog/${article._id}`}
                                    className="mt-6 text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-blue-400 transition-colors inline-block"
                                >
                                    Full Story <ChevronRight size={14} className="text-blue-400 inline" />
                                </Link>
                            </div>
                        </LiftedCard>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative py-32 px-6 lg:px-20 overflow-hidden mt-12 bg-neutral-900 border-t border-white/5">
                <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
                    <img src="/assets/blog/hero.png" className="w-full h-full object-cover" alt="" />
                </div>
                <div className="relative z-10 text-center max-w-3xl mx-auto">
                    <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-white tracking-tighter">Join The <span className="italic font-serif">Campus Conversation</span></h2>
                    <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                        Share your style hacks, sustainability tips, and campus stories. Get featured in The Campus Ledger and inspire others.
                    </p>
                    <div className="flex justify-center">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/submit-story"
                                className="bg-white text-black font-black px-12 py-5 rounded-full shadow-2xl hover:bg-gray-100 transition-all uppercase tracking-widest text-sm inline-block"
                            >
                                Submit Your Story
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, User, PlusCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

    const staticDispatches = [
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
        {
            _id: "static2",
            category: "STYLE HACKS",
            title: "Decoding Fabric Tags: What to Look for in Vintage Denim",
            authorName: "Sneha Reddy",
            date: "May 18, 2024",
            readTime: "3 min read",
            imageUrl: "https://images.unsplash.com/photo-1542272206-417345558949?q=80&w=2000&auto=format&fit=crop",
            likes: [],
        },
        {
            _id: "static3",
            category: "CAMPUS LIFE",
            title: "The Midnight Hand-off: Best Spots for Safe Exchanges",
            authorName: "Ananya Singh",
            date: "May 15, 2024",
            readTime: "6 min read",
            imageUrl: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?q=80&w=2000&auto=format&fit=crop",
            likes: [],
        }
    ];

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:5001/api/blogs');
                setCommunityStories(res.data);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const handleLike = async (blogId) => {
        if (!user) {
            alert('Please login to like stories');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`http://localhost:5001/api/blogs/${blogId}/like`, {}, {
                headers: { 'x-auth-token': token }
            });

            // Update state locally
            setCommunityStories(prev => prev.map(blog =>
                blog._id === blogId ? { ...blog, likes: res.data } : blog
            ));
        } catch (err) {
            console.error("Error liking blog:", err);
        }
    };

    const allDispatches = [...communityStories, ...staticDispatches];

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
                                </div>
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-3 text-white font-bold group/btn py-3 px-6 bg-blue-600 rounded-full hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
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
                    <div className="flex items-center gap-6">
                        <Link to="/submit-story">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-900/10"
                            >
                                <PlusCircle size={16} /> Contribute Story
                            </motion.button>
                        </Link>
                        <div className="hidden lg:flex flex-wrap gap-3">
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
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {allDispatches.map((article, index) => (
                            <LiftedCard key={index} className="flex flex-col group !p-0 bg-transparent border-none shadow-none hover:shadow-none !translate-y-0 hover:!translate-y-[-10px]">
                                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8 border border-white/5">
                                    <img
                                        src={article.imageUrl.startsWith('/') ? `http://localhost:5001${article.imageUrl}` : article.imageUrl}
                                        alt={article.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 brightness-90 group-hover:brightness-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60"></div>
                                    <div className="absolute bottom-6 left-6 flex justify-between items-center w-[calc(100%-3rem)]">
                                        <span className="px-3 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-tighter rounded-full text-white">
                                            {article.category.split(' ')[0]}
                                        </span>
                                        {article._id && !article._id.startsWith('static') && (
                                            <motion.button
                                                whileTap={{ scale: 0.8 }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleLike(article._id);
                                                }}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-colors ${article.likes?.includes(user?.id)
                                                        ? 'bg-rose-500 text-white'
                                                        : 'bg-white/10 text-white hover:bg-white/20'
                                                    }`}
                                            >
                                                <Heart size={14} fill={article.likes?.includes(user?.id) ? "currentColor" : "none"} />
                                                <span className="text-[10px] font-black">{article.likes?.length || 0}</span>
                                            </motion.button>
                                        )}
                                    </div>
                                </div>
                                <div className="px-2">
                                    <h4 className="text-2xl font-bold leading-snug text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-2">{article.title}</h4>
                                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-gray-500 tracking-[0.1em] uppercase">
                                        <div className="flex items-center">
                                            <User size={12} className="mr-2 text-blue-400" /> <span>{article.authorName || article.author}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock size={12} className="mr-2 text-blue-400" /> <span>{article.readTime}</span>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        className="mt-6 text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:text-blue-400 transition-colors"
                                    >
                                        Full Story <ChevronRight size={14} className="text-blue-400" />
                                    </motion.button>
                                </div>
                            </LiftedCard>
                        ))}
                    </div>
                )}
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
                    <Link to="/submit-story">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black font-black px-12 py-5 rounded-full shadow-2xl hover:bg-gray-100 transition-all uppercase tracking-widest text-sm"
                        >
                            Submit Your Story
                        </motion.button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Blog;

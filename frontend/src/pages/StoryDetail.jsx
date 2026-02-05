import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Heart, MessageCircle, Send } from 'lucide-react';
import api from '../services/api';

const StoryDetail = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState('');
    const [userLiked, setUserLiked] = useState(false); // Local toggle for demo
    const [likeCount, setLikeCount] = useState(0);

    // Mock user for comments since we might not have full auth context handy yet
    // In real app, get from AuthContext
    const currentUser = "Campus User";

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const res = await api.get(`/stories/${id}`);
                setStory(res.data);
                setLikeCount(res.data.likes?.length || 0);
                // Check if current user ID is in likes array if authenticating
            } catch (err) {
                console.error("Failed to fetch story", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStory();
    }, [id]);

    const handleLike = async () => {
        try {
            const res = await api.put(`/stories/${id}/like`, { userId: 'anonymous_or_auth_id' }); // Replace with real ID
            setLikeCount(res.data.length);
            setUserLiked(!userLiked);
        } catch (err) {
            console.error("Error liking story", err);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            const res = await api.post(`/stories/${id}/comment`, {
                user: currentUser,
                text: commentText
            });
            setStory(prev => ({ ...prev, comments: res.data }));
            setCommentText('');
        } catch (err) {
            console.error("Error commenting", err);
        }
    };

    if (loading) return <div className="text-white text-center pt-20">Loading story...</div>;
    if (!story) return <div className="text-white text-center pt-20">Story not found.</div>;

    return (
        <div className="bg-[#121212] min-h-screen text-white font-sans pt-24 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <Link to="/blog" className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Campus Ledger
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-500/30">
                            {story.category || 'Community'}
                        </span>
                        <span className="text-gray-500 text-sm flex items-center gap-2">
                            <Clock size={14} /> {story.readTime || '3 min read'}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{story.title}</h1>
                    <div className="flex items-center justify-between border-y border-white/10 py-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-lg">
                                {story.author?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <p className="font-bold text-lg">{story.author}</p>
                                <p className="text-gray-500 text-xs uppercase tracking-wide">Author</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 text-lg font-bold transition-colors ${userLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                            >
                                <Heart size={24} fill={userLiked ? "currentColor" : "none"} /> {likeCount}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cover Image */}
                {story.coverImage && (
                    <div className="rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl border border-white/5 aspect-video relative">
                        <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed mb-20 whitespace-pre-wrap">
                    {story.content}
                </div>

                {/* Additional Images */}
                {story.additionalImages?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                        {story.additionalImages.map((img, idx) => (
                            <div key={idx} className="rounded-2xl overflow-hidden border border-white/5">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Comments Section */}
                <div className="bg-[#1a1a1a] rounded-[2.5rem] p-8 md:p-12 border border-white/5">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <MessageCircle className="text-blue-400" /> Discussion ({story.comments?.length || 0})
                    </h3>

                    {/* Comment Form */}
                    <form onSubmit={handleComment} className="mb-12 relative">
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="w-full bg-[#121212] text-white p-6 pr-16 rounded-2xl border border-white/10 focus:border-blue-500 focus:outline-none transition-colors min-h-[120px]"
                        />
                        <button
                            type="submit"
                            disabled={!commentText.trim()}
                            className="absolute bottom-4 right-4 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Send size={20} />
                        </button>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-8">
                        {story.comments?.length > 0 ? (
                            story.comments.map((comment, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-10 h-10 bg-gray-800 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-gray-400">
                                        {comment.user?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <span className="font-bold text-white">{comment.user}</span>
                                            <span className="text-xs text-gray-600">{new Date(comment.date).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-gray-400 leading-relaxed">{comment.text}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center italic">No comments yet. Be the first to start the conversation!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryDetail;

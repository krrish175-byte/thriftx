import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare, Send, Globe } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-[#121212] min-h-screen text-white font-sans py-32 px-6 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-24 items-start">

                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter mb-8">
                            Let's <span className="italic font-serif text-blue-400">Collaborate</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-16 max-w-lg leading-relaxed">
                            Have questions about our campus operations or need technical assistance? Our team is always on standby.
                        </p>

                        <div className="space-y-12">
                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                                    <Mail className="text-blue-400" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Digital Dispatch</h4>
                                    <p className="text-2xl font-bold group-hover:text-blue-400 transition-colors">support@campusthrift.com</p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple-500 transition-colors">
                                    <MapPin className="text-purple-400" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">The Terminal</h4>
                                    <p className="text-2xl font-bold group-hover:text-purple-400 transition-colors">NMIMS Campus, Mumbai, India</p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                                    <MessageSquare className="text-blue-400" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Community Office Hours</h4>
                                    <p className="text-2xl font-bold uppercase tracking-tight">Mon — Fri | 09:00 — 18:00 IST</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 rounded-[3.5rem] p-12 lg:p-16 border border-white/10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px]"></div>

                        <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
                            Send a Message <Zap className="text-blue-400" size={24} />
                        </h3>

                        <form className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all font-bold"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Campus Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all font-bold"
                                    placeholder="yourname@college.edu"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4 italic">Message</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-6 h-48 focus:outline-none focus:border-blue-500 transition-all font-medium leading-relaxed"
                                    placeholder="Tell us what's on your mind..."
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-white text-black font-black py-5 rounded-full uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors mt-8"
                            >
                                TRANSMIT MESSAGE <Send size={16} />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Zap = ({ size, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

export default Contact;

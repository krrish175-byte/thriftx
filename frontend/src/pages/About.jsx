import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Heart, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-[#121212] min-h-screen text-white font-sans overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-32 px-6 lg:px-20 border-b border-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter mb-8 italic font-serif">
                            Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 not-italic font-sans">Thrifting</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                            Campus ThriftX is more than a marketplace. It's a movement towards sustainable campus culture and student empowerment.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-sm uppercase tracking-[0.4em] text-blue-400 font-black mb-6">OUR ETHOS</h2>
                        <h3 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight">Redefining students' relationship with <span className="italic font-serif">ownership</span>.</h3>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Born out of the need for an accessible, sustainable, and secure way to trade within our community, Campus ThriftX brings high-end aesthetics to the world of second-hand student commerce.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="flex gap-4">
                                <Zap className="text-blue-400 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold mb-2">High Efficiency</h4>
                                    <p className="text-sm text-gray-500">Optimized for quick campus hand-offs and verified transactions.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Globe className="text-purple-400 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold mb-2">Sustainable Core</h4>
                                    <p className="text-sm text-gray-500">Every trade reduces the campus carbon footprint by 15%.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-[4rem] overflow-hidden border border-white/10 group">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                alt="Students collaborating"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32 px-6 lg:px-20 bg-neutral-900 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-sm uppercase tracking-[0.4em] text-gray-500 font-black mb-6">CORE VALUES</h2>
                        <p className="text-4xl font-bold tracking-tight">The principles that guide our narrative.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: <Users size={32} />, title: "Radical Transparency", text: "Verified students only. No hidden agendas, just honest campus commerce." },
                            { icon: <Heart size={32} />, title: "Community Centric", text: "Every feature we build is designed to strengthen student connections." },
                            { icon: <Zap size={32} />, title: "Premium Experience", text: "Because thrifting shouldn't feel second-class. High-end UI for high-end souls." }
                        ].map((item, idx) => (
                            <div key={idx} className="p-12 rounded-[3rem] bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                                <div className="text-blue-400 mb-8 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                                <p className="text-gray-500 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

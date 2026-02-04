import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MoodMomentum = () => {
    const vibes = [
        {
            title: 'The Deep Work Zone',
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
            size: 'col-span-1 row-span-1'
        },
        {
            title: 'Off-the-Clock',
            image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800',
            size: 'col-span-1 row-span-1'
        },
        {
            title: '',
            image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=400',
            size: 'col-span-1 row-span-1'
        },
        {
            title: '',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400',
            size: 'col-span-1 row-span-1'
        },
        {
            title: '',
            image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400',
            size: 'col-span-1 row-span-1'
        },
        {
            title: 'Digital Nomactic',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
            size: 'col-span-2 row-span-1'
        },
        {
            title: 'The Daily Uniform',
            image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800',
            size: 'col-span-2 row-span-1'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="bg-[#1e1e1e] rounded-[3rem] overflow-hidden shadow-2xl">
                {/* Header Section */}
                <div className="p-10 md:p-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Mood & Momentum</h2>
                        <p className="text-gray-400 text-lg">Shop collections curated for your day's journey</p>
                    </div>
                    <Link to="/products" className="text-white hover:text-gray-300 transition-colors flex items-center gap-2 group text-lg font-medium">
                        Uncover All Vibes
                        <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid Content */}
                <div className="bg-[#f2f2f2] p-6 md:p-10">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* First Row */}
                        <motion.div variants={itemVariants} className="col-span-2 relative group cursor-pointer overflow-hidden rounded-3xl h-64">
                            <img src={vibes[0].image} alt={vibes[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            <div className="absolute inset-x-8 bottom-8">
                                <h3 className="text-2xl font-bold text-white leading-tight">{vibes[0].title}</h3>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-2 relative group cursor-pointer overflow-hidden rounded-3xl h-64">
                            <img src={vibes[1].image} alt={vibes[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            <div className="absolute inset-x-8 bottom-8">
                                <h3 className="text-2xl font-bold text-white leading-tight">{vibes[1].title}</h3>
                            </div>
                        </motion.div>

                        {/* Second Row */}
                        <motion.div variants={itemVariants} className="col-span-1 relative group cursor-pointer overflow-hidden rounded-3xl h-60">
                            <img src={vibes[2].image} alt="Vibe item" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-1 relative group cursor-pointer overflow-hidden rounded-3xl h-60">
                            <img src={vibes[3].image} alt="Vibe item" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-2 md:col-span-1 relative group cursor-pointer overflow-hidden rounded-3xl h-60">
                            <img src={vibes[4].image} alt="Vibe item" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-2 md:col-span-1 relative group cursor-pointer overflow-hidden rounded-3xl h-60 flex items-center justify-center bg-gray-300">
                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" alt="Vibe portrait" className="w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110" />
                        </motion.div>

                        {/* Third Row */}
                        <motion.div variants={itemVariants} className="col-span-2 relative group cursor-pointer overflow-hidden rounded-3xl h-72">
                            <img src={vibes[5].image} alt={vibes[5].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                            <div className="absolute inset-x-8 bottom-8">
                                <h3 className="text-2xl font-bold text-white leading-tight">{vibes[5].title}</h3>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="col-span-2 relative group cursor-pointer overflow-hidden rounded-3xl h-72">
                            <img src={vibes[6].image} alt={vibes[6].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                            <div className="absolute inset-x-8 bottom-8">
                                <h3 className="text-2xl font-bold text-white leading-tight">{vibes[6].title}</h3>
                            </div>
                            <div className="absolute bottom-4 right-4 text-white opacity-40">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MoodMomentum;

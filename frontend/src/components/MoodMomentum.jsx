import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MoodMomentum = () => {
    const vibes = [
        {
            title: 'The Deep Work Zone',
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
            size: 'col-span-2 md:col-span-1 row-span-1',
            link: '/products?search=tech'
        },
        {
            title: 'Off-the-Clock',
            image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800',
            size: 'col-span-2 md:col-span-1 row-span-1',
            link: '/products?search=casual'
        },
        {
            title: 'Party & Events',
            image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=400',
            size: 'col-span-2 md:col-span-1 row-span-1',
            link: '/products?search=party'
        },
        {
            title: 'Streetwear',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400',
            size: 'col-span-2 md:col-span-1 row-span-1',
            link: '/products?search=streetwear'
        },
        {
            title: 'Exam Season',
            image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
            size: 'col-span-2 row-span-1',
            link: '/products?search=books'
        },
        {
            title: 'Digital Nomadic',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
            size: 'col-span-2 row-span-1',
            link: '/products?search=laptop'
        },
        {
            title: 'The Daily Uniform',
            image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1200',
            size: 'col-span-2 md:col-span-4 row-span-1',
            link: '/products?search=essentials'
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
                <div className="bg-[#1a1a1a] p-6 md:p-10 border-t border-white/10">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {vibes.map((vibe, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`${vibe.size} relative group cursor-pointer overflow-hidden rounded-3xl h-64 md:h-72`}
                            >
                                <Link to={vibe.link} className="block w-full h-full">
                                    <img
                                        src={vibe.image}
                                        alt={vibe.title || "Vibe"}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/95 transition-all duration-300" />
                                    {vibe.title && (
                                        <div className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8">
                                            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{vibe.title}</h3>
                                        </div>
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MoodMomentum;

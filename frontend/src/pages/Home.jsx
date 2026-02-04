import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import MoodMomentum from '../components/MoodMomentum';
import CuratedCollections from '../components/CuratedCollections';
import TrustSection from '../components/TrustSection';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await api.get('/products?sort=views&limit=4');
                setFeaturedProducts(res.data.slice(0, 4));
            } catch (err) {
                console.error('Error fetching trending products:', err);
            }
        };
        fetchTrending();
    }, []);

    return (
        <div className="bg-white">
            <Hero />

            <MoodMomentum />

            <CuratedCollections />

            {/* Trending Section */}
            <section className="relative -mt-12 pt-40 pb-48 bg-[#fafafa] rounded-[2rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] z-10 border border-slate-200/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-8 h-[2px] bg-blue-600"></span>
                                <p className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Trending Now</p>
                            </div>
                            <h2 className="text-5xl font-heading font-black text-slate-900 leading-tight">
                                Fresh Drops <br className="hidden sm:block" /> from Campus.
                            </h2>
                        </div>
                        <Link to="/products" className="group flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm">
                            EXPLORE ALL <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    <div className="mt-20 text-center md:hidden">
                        <Link to="/products" className="btn-outline inline-block rounded-full px-10">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            <TrustSection />

            {/* Banner Section */}
            <section className="relative -mt-12 py-48 bg-neutral-900 text-center text-white overflow-hidden rounded-[2rem] z-30 shadow-[0_-20px_40px_rgba(0,0,0,0.3)] border border-white/10">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=2070"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-2xl mx-auto px-4">
                    <h2 className="text-5xl font-heading font-black mb-8 leading-tight">SELL YOUR <br /> PRE-LOVED CLOTHES</h2>
                    <p className="text-slate-300 mb-10 text-xl font-medium italic">
                        "Turn your closet into cash. Safe, simple, and student-powered."
                    </p>
                    <Link to="/sell" className="inline-block px-12 py-5 bg-white text-black font-black uppercase tracking-tighter hover:bg-blue-600 hover:text-white transition-all duration-500 rounded-full shadow-2xl">
                        Start Selling Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;

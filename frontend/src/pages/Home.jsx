import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import MoodMomentum from '../components/MoodMomentum';
import CuratedCollections from '../components/CuratedCollections';
import ProductCard from '../components/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    // Dummy data for featured products
    const featuredProducts = [
        {
            _id: '1',
            title: 'Vintage Nike Hoodie',
            price: 1200,
            originalPrice: 3500,
            images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600'],
            brand: 'Nike',
            condition: 'Good',
        },
        {
            _id: '2',
            title: 'Levi\'s Denim Jacket',
            price: 1800,
            originalPrice: 4000,
            images: ['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=600'],
            brand: 'Levi\'s',
            condition: 'Like New',
        },
        {
            _id: '3',
            title: 'Oversized Graphic Tee',
            price: 650,
            originalPrice: 1200,
            images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600'],
            brand: 'Urban Edit',
            condition: 'Brand New',
        },
        {
            _id: '4',
            title: 'Casual Chinos',
            price: 900,
            images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=600'],
            brand: 'Zara',
            condition: 'Good',
        },
        {
            _id: '5',
            title: 'Adidas Track Jacket',
            price: 1500,
            originalPrice: 3000,
            images: ['https://images.unsplash.com/photo-1587561300962-e64f7724217a?auto=format&fit=crop&q=80&w=600'],
            brand: 'Adidas',
            condition: 'Excellent',
        },
        {
            _id: '6',
            title: 'Vintage Band Tee',
            price: 750,
            originalPrice: 1500,
            images: ['https://images.unsplash.com/photo-1598032895397-f58c8c0e1140?auto=format&fit=crop&q=80&w=600'],
            brand: 'No Brand',
            condition: 'Worn',
        },
        {
            _id: '7',
            title: 'High-Waisted Jeans',
            price: 1100,
            originalPrice: 2800,
            images: ['https://images.unsplash.com/photo-1541099644-47ae7f01a774?auto=format&fit=crop&q=80&w=600'],
            brand: 'Topshop',
            condition: 'Good',
        },
        {
            _id: '8',
            title: 'Plaid Flannel Shirt',
            price: 800,
            originalPrice: 1800,
            images: ['https://images.unsplash.com/photo-1596755094415-cf7072460257?auto=format&fit=crop&q=80&w=600'],
            brand: 'Uniqlo',
            condition: 'Like New',
        }
    ];

    return (
        <div className="bg-white">
            <Hero />

            <MoodMomentum />

            <CuratedCollections />

            {/* Trending Section */}
            <section className="relative -mt-24 pt-52 pb-24 bg-[#fafafa] rounded-t-[5rem] shadow-[0_-30px_60px_rgba(0,0,0,0.05)] z-10">
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

            {/* Banner Section */}
            <section className="relative py-32 bg-neutral-900 text-center text-white overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=2070"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-2xl mx-auto px-4">
                    <h2 className="text-4xl font-heading font-bold mb-6">SELL YOUR PRE-LOVED CLOTHES</h2>
                    <p className="text-neutral-300 mb-8 text-lg">
                        Turn your closet into cash. Safe, simple, and sustainable.
                    </p>
                    <Link to="/sell" className="btn-primary bg-white text-black hover:bg-neutral-200 border-none rounded-full">
                        Start Selling
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;

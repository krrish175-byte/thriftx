import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
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
            images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=500'],
            brand: 'Nike',
            condition: 'Good',
        },
        {
            _id: '2',
            title: 'Levi\'s Denim Jacket',
            price: 1800,
            originalPrice: 4000,
            images: ['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=500'],
            brand: 'Levi\'s',
            condition: 'Like New',
        },
        {
            _id: '3',
            title: 'Oversized Graphic Tee',
            price: 650,
            originalPrice: 1200,
            images: ['https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?auto=format&fit=crop&q=80&w=500'],
            brand: 'H&M',
            condition: 'Brand New',
        },
        {
            _id: '4',
            title: 'Casual Chinos',
            price: 900,
            images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=500'],
            brand: 'Zara',
            condition: 'Good',
        }
    ];

    return (
        <div className="bg-white">
            <Hero />

            {/* Featured Section */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-primary mb-2">TRENDING NOW</h2>
                        <p className="text-neutral-500">Curated picks from campus.</p>
                    </div>
                    <Link to="/products" className="hidden md:flex items-center text-sm font-semibold text-primary hover:text-accent transition group">
                        VIEW ALL <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link to="/products" className="btn-outline inline-block">
                        View All Products
                    </Link>
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
                    <Link to="/sell" className="btn-primary bg-white text-black hover:bg-neutral-200 border-none">
                        Start Selling
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;

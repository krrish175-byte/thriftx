import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CuratedCollections = () => {
    const collections = [
        {
            title: 'Tech Accessories',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
            path: '/products?category=Tech'
        },
        {
            title: 'Bags & Wallets',
            image: 'https://images.unsplash.com/photo-1548036627-19fceb1d4191?auto=format&fit=crop&q=80&w=800',
            path: '/products?category=Bags'
        },
        {
            title: 'Work Essentials',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
            path: '/products?category=Office'
        },
        {
            title: 'Books & Stationery',
            image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=1200',
            path: '/products?category=Books'
        }
    ];

    return (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-5xl font-heading font-black text-black mb-4">Curated Collections</h2>
                    <p className="text-neutral-500 text-lg max-w-xl">
                        Explore our most popular categories handpicked for the campus lifestyle.
                    </p>
                </div>
                <Link to="/products" className="hidden md:flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition group tracking-widest uppercase">
                    View All Categories <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[700px]">
                {/* Tech Accessories - Large Left */}
                <Link
                    to={collections[0].path}
                    className="md:col-span-5 relative group overflow-hidden rounded-[2rem] bg-neutral-100"
                >
                    <img src={collections[0].image} alt={collections[0].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-x-8 bottom-8">
                        <h3 className="text-3xl font-heading font-black text-white drop-shadow-md">{collections[0].title}</h3>
                        <div className="w-full h-px bg-white/30 mt-4 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </div>
                </Link>

                {/* Right Side Complex Grid */}
                <div className="md:col-span-7 grid grid-rows-2 gap-6 h-full">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Bags & Wallets */}
                        <Link
                            to={collections[1].path}
                            className="relative group overflow-hidden rounded-[2rem] bg-neutral-100"
                        >
                            <img src={collections[1].image} alt={collections[1].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-x-6 bottom-6">
                                <h3 className="text-xl font-heading font-black text-white drop-shadow-md">{collections[1].title}</h3>
                            </div>
                        </Link>
                        {/* Work Essentials */}
                        <Link
                            to={collections[2].path}
                            className="relative group overflow-hidden rounded-[2rem] bg-neutral-100"
                        >
                            <img src={collections[2].image} alt={collections[2].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-x-6 bottom-6">
                                <h3 className="text-xl font-heading font-black text-white drop-shadow-md">{collections[2].title}</h3>
                            </div>
                        </Link>
                    </div>

                    {/* Books & Stationery - Wide Bottom */}
                    <Link
                        to={collections[3].path}
                        className="relative group overflow-hidden rounded-[2rem] bg-neutral-100"
                    >
                        <img src={collections[3].image} alt={collections[3].title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-x-8 bottom-8">
                            <h3 className="text-2xl font-heading font-black text-white drop-shadow-md">{collections[3].title}</h3>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="mt-8 text-center md:hidden">
                <Link to="/products" className="text-blue-600 font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                    View All Categories <ArrowRight size={18} />
                </Link>
            </div>
        </section>
    );
};

export default CuratedCollections;

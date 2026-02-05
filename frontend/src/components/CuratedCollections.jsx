import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CuratedCollections = () => {
    const collections = [
        {
            title: 'Fashion & Apparel',
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
            path: '/products?category=Clothes'
        },
        {
            title: 'Tech Accessories',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
            path: '/products?category=Tech'
        },
        // Fixed Image URL
        {
            title: 'Bags & Wallets',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
            path: '/products?category=Bags'
        },
        {
            title: 'Work Essentials',
            image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=800',
            path: '/products?category=Office'
        },
        {
            title: 'Books & Stationery',
            image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800',
            path: '/products?category=Books'
        }
    ];

    // Duplicate for seamless loop
    const marqueeItems = [...collections, ...collections, ...collections];

    return (
        <section className="py-24 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Curated Collections</h2>
                        <p className="text-neutral-300 text-sm max-w-xl">
                            Explore our most popular categories handpicked for the campus lifestyle.
                        </p>
                    </div>
                    <Link to="/products" className="flex items-center text-xs font-bold text-blue-400 hover:text-blue-300 transition group tracking-widest uppercase">
                        View All Categories <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Auto Scrolling Marquee Container */}
            <div className="relative w-full overflow-hidden">
                <div className="flex gap-6 animate-marquee whitespace-nowrap px-4">
                    {marqueeItems.map((item, index) => (
                        <Link
                            key={`${item.title}-${index}`}
                            to={item.path}
                            className="flex-none w-[280px] sm:w-[320px] md:w-[380px] aspect-[4/5] relative group overflow-hidden rounded-[2.5rem] bg-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            <img
                                src={item.image}
                                loading="eager"
                                alt={item.title}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-x-8 bottom-8 whitespace-normal">
                                <h3 className="text-2xl font-black text-white leading-tight italic decoration-blue-500 decoration-2">
                                    {item.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } 
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default CuratedCollections;

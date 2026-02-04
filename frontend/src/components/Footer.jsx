import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-heading font-bold tracking-tighter text-white">
                            CAMPUS<span className="font-light">THRIFTX</span>
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                            The premium marketplace for students. Buy, sell, and discover sustainable fashion on campus.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Shop</h4>
                        <ul className="space-y-3 text-sm text-neutral-400">
                            <li><Link to="/products" className="hover:text-white transition">All Products</Link></li>
                            <li><Link to="/products?new=true" className="hover:text-white transition">New Arrivals</Link></li>
                            <li><Link to="/products?category=men" className="hover:text-white transition">Men</Link></li>
                            <li><Link to="/products?category=women" className="hover:text-white transition">Women</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Support</h4>
                        <ul className="space-y-3 text-sm text-neutral-400">
                            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link to="/faq" className="hover:text-white transition">FAQs</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Stay Updated</h4>
                        <p className="text-neutral-400 text-sm mb-4">Subscribe for exclusive offers and drops.</p>
                        <div className="flex border-b border-neutral-700 py-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-transparent border-none focus:outline-none w-full text-sm text-white placeholder-neutral-500"
                            />
                            <button className="text-sm font-bold uppercase text-white hover:text-neutral-300 transition">
                                JOIN
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-neutral-500 text-xs">
                        &copy; {new Date().getFullYear()} Campus ThriftX. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-neutral-400 hover:text-white transition"><Instagram size={20} /></a>
                        <a href="#" className="text-neutral-400 hover:text-white transition"><Twitter size={20} /></a>
                        <a href="#" className="text-neutral-400 hover:text-white transition"><Facebook size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

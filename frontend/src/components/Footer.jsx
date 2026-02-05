import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-10 font-sans border-t border-neutral-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Section: Join the Community */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-4 text-white">
                            Join the Community
                        </h2>
                        <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                            Get exclusive access to new drops, campus trends, and surprise treats.
                        </p>
                    </div>
                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent border-b border-neutral-700 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors w-full sm:w-64"
                        />
                        <button className="bg-white text-black px-8 py-3 text-xs font-black tracking-widest uppercase hover:bg-neutral-200 transition-colors">
                            SUBSCRIBE
                        </button>
                    </div>
                </div>

                {/* Main Grid Navigation */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mb-24">

                    {/* Column 1: Know Us */}
                    <div className="space-y-12">
                        <div>
                            <h4 className="text-[10px] font-black tracking-widest uppercase text-neutral-500 mb-6 font-bold">KNOW US</h4>
                            <ul className="space-y-3 text-sm text-neutral-300 font-medium">
                                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link to="/corporate-gifting" className="hover:text-white transition-colors">Corporate Gifting</Link></li>
                                <li><Link to="/find-a-store" className="hover:text-white transition-colors">Find a Store</Link></li>
                                <li><Link to="/community-impact" className="hover:text-white transition-colors">Community Impact</Link></li>
                                <li><Link to="/blog" className="hover:text-white transition-colors">Our Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black tracking-widest uppercase text-neutral-500 mb-6 font-bold">BLOGS</h4>
                            <ul className="space-y-3 text-sm text-neutral-300 font-medium">
                                <li><Link to="/blog?tag=Fashion" className="hover:text-white transition-colors">Fashion Trends</Link></li>
                                <li><Link to="/blog?tag=Sustainability" className="hover:text-white transition-colors">Sustainable Fashion</Link></li>
                                <li><Link to="/blog?tag=Campus" className="hover:text-white transition-colors">Campus Style Guide</Link></li>
                                <li><Link to="/blog?tag=Thrift" className="hover:text-white transition-colors">Second Hand Shopping</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Helpdesk */}
                    <div>
                        <h4 className="text-[10px] font-black tracking-widest uppercase text-neutral-500 mb-6 font-bold">HELPDESK</h4>
                        <ul className="space-y-3 text-sm text-neutral-300 font-medium">
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
                            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
                            <li><Link to="/cancellation" className="hover:text-white transition-colors">Cancellation Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Search Terms */}
                    <div>
                        <h4 className="text-[10px] font-black tracking-widest uppercase text-neutral-500 mb-6 font-bold">MOST SEARCHED ON CAMPUS THRIFT</h4>
                        <ul className="space-y-3 text-sm text-neutral-300 font-medium">
                            <li><Link to="/products?search=Vintage" className="hover:text-white transition-colors">Vintage Clothing</Link></li>
                            <li><Link to="/products?search=Designer" className="hover:text-white transition-colors">Designer Bags</Link></li>
                            <li><Link to="/products?search=Essentials" className="hover:text-white transition-colors">Campus Essentials</Link></li>
                            <li><Link to="/products?search=Tech" className="hover:text-white transition-colors">Tech Accessories</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Gifts */}
                    <div>
                        <h4 className="text-[10px] font-black tracking-widest uppercase text-neutral-500 mb-6 font-bold">GIFTS</h4>
                        <ul className="space-y-3 text-sm text-neutral-300 font-medium">
                            <li><Link to="/products?tag=Gift+Cards" className="hover:text-white transition-colors">Gift Cards</Link></li>
                            <li><Link to="/products?tag=Birthday" className="hover:text-white transition-colors">Birthday Gifts</Link></li>
                            <li><Link to="/products?tag=Graduation" className="hover:text-white transition-colors">Graduation Gifts</Link></li>
                            <li><Link to="/products?tag=Anniversary" className="hover:text-white transition-colors">Anniversary Gifts</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="font-heading font-bold text-lg tracking-tight text-white uppercase tracking-[0.2em]">
                        Campus Thrift
                    </div>

                    <p className="text-neutral-600 text-[10px] uppercase tracking-wide">
                        &copy; {new Date().getFullYear()} Campus Thrift. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="flex gap-4">
                            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Instagram size={16} /></a>
                            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Twitter size={16} /></a>
                            <a href="#" className="text-neutral-500 hover:text-white transition-colors"><Facebook size={16} /></a>
                        </div>
                        <div className="h-3 w-[1px] bg-neutral-800"></div>
                        <div className="flex gap-4 text-[10px] font-black tracking-widest uppercase text-neutral-500">
                            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

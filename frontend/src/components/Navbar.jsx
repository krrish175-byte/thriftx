import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-primary focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Logo */}
                    <Link to="/" className="text-2xl font-heading font-bold tracking-tighter text-primary">
                        CAMPUS<span className="font-light">THRIFTX</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-12">
                        <Link to="/products" className="text-sm font-medium text-primary hover-underline-animation">SHOP</Link>
                        <Link to="/sell" className="text-sm font-medium text-primary hover-underline-animation">SELL</Link>
                        <Link to="/about" className="text-sm font-medium text-primary hover-underline-animation">ABOUT</Link>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-6">
                        <button className="text-primary hover:text-accent transition-colors">
                            <Search size={20} className="stroke-[1.5]" />
                        </button>
                        <Link to="/login" className="hidden md:block text-primary hover:text-accent transition-colors">
                            <User size={20} className="stroke-[1.5]" />
                        </Link>
                        <Link to="/cart" className="relative text-primary hover:text-accent transition-colors">
                            <ShoppingBag size={20} className="stroke-[1.5]" />
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full w-3.5 h-3.5 flex items-center justify-center">0</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-neutral-100 shadow-lg animate-fade-in-down">
                    <div className="px-4 py-6 space-y-4 flex flex-col items-center">
                        <Link to="/products" className="text-sm font-medium text-primary uppercase tracking-wide" onClick={() => setIsOpen(false)}>Shop</Link>
                        <Link to="/sell" className="text-sm font-medium text-primary uppercase tracking-wide" onClick={() => setIsOpen(false)}>Sell</Link>
                        <Link to="/login" className="text-sm font-medium text-primary uppercase tracking-wide" onClick={() => setIsOpen(false)}>Account</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

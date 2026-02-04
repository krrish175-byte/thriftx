import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plus, Bell, User, Menu, X, LogOut, Heart, ShoppingBag, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        // Check for logged in user
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const navLinks = [
        { name: 'BROWSE', path: '/products' },
        { name: 'DASHBOARD', path: '/dashboard' },
        { name: 'BLOG', path: '/blog' },
        { name: 'WISHLIST', path: '/wishlist' },
        { name: 'MY OFFERS', path: '/my-offers' },
        { name: 'ORDERS', path: '/orders' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Promotional Banner */}
            <div className="w-full py-2 text-center text-sm text-white"
                style={{
                    background: 'linear-gradient(90deg, #B8860B 0%, #DAA520 50%, #CD853F 100%)'
                }}>
                <span className="font-medium">
                    ✨ Fresh Finds: New curated collections are now live! | Free On-Campus Delivery 🚚
                </span>
            </div>

            {/* Main Navbar */}
            <nav className={`w-full sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg bg-white/95 backdrop-blur-xl border-b border-black/5' : 'border-b border-black/5'}`}>
                <div className="max-w-[1800px] mx-auto px-4 lg:px-6">
                    <div className="flex justify-between items-center h-24">
                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>

                        {/* Logo Left Section */}
                        <div className="flex items-end gap-12">
                            <Link to="/" className="flex items-center group">
                                <span className="text-6xl sm:text-7xl font-serif font-black tracking-[-0.15em] leading-none transition-all duration-500 group-hover:tracking-[-0.12em] text-black">
                                    THRIFTX
                                </span>
                            </Link>

                            {/* Minimalism Search Placeholder (As seen in ZARA) */}
                            <div className="hidden lg:flex flex-col items-start mb-2 group cursor-pointer">
                                <span className={`text-[10px] font-black tracking-widest uppercase transition-colors ${isScrolled ? 'text-black/60 group-hover:text-black' : 'text-black/40 group-hover:text-black'}`}>SEARCH</span>
                                <div className={`w-32 h-[1px] transition-colors mt-1 ${isScrolled ? 'bg-black/20 group-hover:bg-black' : 'bg-black/20 group-hover:bg-black'}`}></div>
                            </div>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-[10px] font-black tracking-[0.2em] transition-all duration-300 ${isActive(link.path)
                                        ? 'text-black'
                                        : 'text-black/40 hover:text-black'
                                        }`}
                                >
                                    {link.name.toUpperCase()}
                                </Link>
                            ))}
                        </div>

                        {/* Right Section: Sell Button + Icons */}
                        <div className="flex items-center space-x-4">
                            {/* Sell Button */}
                            <Link
                                to="/sell"
                                className="hidden lg:flex items-center gap-2 px-6 py-2.5 text-[10px] font-black text-black border border-black/20 hover:border-black transition-all duration-300 tracking-widest uppercase"
                            >
                                SELL ANYWHERE
                            </Link>

                            {/* Wishlist Icon */}
                            <Link to="/wishlist" className="text-black/40 hover:text-black transition-colors relative">
                                <Heart size={18} />
                            </Link>

                            {/* Cart Icon */}
                            <Link to="/checkout" className="text-black/40 hover:text-black transition-colors relative">
                                <ShoppingBag size={20} strokeWidth={1.5} />
                                <span className="absolute -top-2 -right-2 w-4 h-4 bg-black rounded-full text-[8px] flex items-center justify-center text-white font-black">1</span>
                            </Link>

                            {/* Notification Bell */}
                            <button className="text-black/40 hover:text-black transition-colors">
                                <Bell size={18} />
                            </button>

                            {/* Profile / User Section */}
                            {user ? (
                                <div className="flex items-center gap-3">
                                    {/* Admin Link if admin */}
                                    {user.role === 'admin' && (
                                        <Link
                                            to="/admin/dashboard"
                                            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-black border border-black/20 hover:border-black transition-all duration-300 tracking-widest uppercase mr-2"
                                        >
                                            <LayoutDashboard size={14} />
                                            ADMIN
                                        </Link>
                                    )}
                                    <Link to="/dashboard" className="flex items-center gap-2 text-black/60 hover:text-black transition-colors">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center overflow-hidden">
                                            {user.picture ? (
                                                <img
                                                    src={user.picture.startsWith('http') ? user.picture : `${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.split('/api')[0] : 'http://localhost:5001'}/${user.picture.replace(/\\/g, '/')}`}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-xs text-white font-bold">{user.name.charAt(0).toUpperCase()}</span>
                                            )}
                                        </div>
                                        <span className="hidden sm:inline text-xs font-black uppercase truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-black/40 hover:text-red-500 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut size={16} />
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="flex items-center gap-2 text-black/60 hover:text-black transition-colors">
                                    <span className="hidden sm:inline text-xs font-black">LOGIN</span>
                                    <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center">
                                        <User size={14} className="text-black" />
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full shadow-lg" style={{ backgroundColor: '#1a1a2e' }}>
                        <div className="px-4 py-4 space-y-3 flex flex-col">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-sm font-medium ${isActive(link.path) ? 'text-white' : 'text-gray-400'
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/sell"
                                className="flex items-center gap-1 text-sm font-medium text-blue-400"
                                onClick={() => setIsOpen(false)}
                            >
                                <Plus size={14} />
                                Sell
                            </Link>
                            {user ? (
                                <>
                                    <div className="pt-2 border-t border-gray-700 mt-2">
                                        <p className="text-xs text-gray-500 mb-2">Signed in as {user.name}</p>
                                        <button
                                            onClick={() => { handleLogout(); setIsOpen(false); }}
                                            className="flex items-center gap-2 text-sm font-medium text-red-400 w-full"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-white pt-2 border-t border-gray-700 mt-2 block"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login / Sign Up
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;


import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Bell,
    User,
    Menu,
    X,
    LogOut,
    Heart,
    ShoppingBag,
    LayoutDashboard,
    Search,
    Package
} from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const profileRef = useRef(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        // Load user
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
        setIsOpen(false);
    };

    const navLinks = [
        { name: 'Browse', path: '/products' },
        { name: 'Blog', path: '/blog' },
        { name: 'Wishlist', path: '/wishlist' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Neo-Brutalist Marquee Banner */}
            <div className="w-full py-3 bg-[#FFEB3B] border-b-2 border-black overflow-hidden relative">
                <div className="animate-marquee whitespace-nowrap font-mono text-sm font-bold text-black uppercase tracking-widest">
                    ⚠️ FRESH COLLECTION DROP: "RETRO REVIVAL" IS LIVE ⚠️ FREE SHIPPING ON ORDERS OVER ₹999 ⚠️ GET IT BEFORE IT'S GONE ⚠️
                </div>
            </div>

            {/* Main Navigation */}
            <nav
                className={`w-full sticky top-0 z-50 transition-all duration-300 bg-white border-b-2 border-black ${isScrolled ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : ''
                    }`}
            >
                <div className="max-w-[1800px] mx-auto px-4 lg:px-8">
                    <div className="flex justify-between items-center h-20 lg:h-24">

                        {/* Left: Mobile Menu & Search */}
                        <div className="flex items-center gap-4 flex-1">
                            <button
                                onClick={() => setIsOpen(true)}
                                className="lg:hidden p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                            >
                                <Menu size={24} strokeWidth={2} />
                            </button>

                            <div className="hidden lg:flex items-center gap-2 group cursor-pointer border-2 border-transparent hover:border-black px-3 py-1.5 transition-all bg-gray-50 hover:bg-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <Search size={20} strokeWidth={2} />
                                <span className="font-mono text-sm font-bold tracking-tight uppercase">Search</span>
                            </div>
                        </div>

                        {/* Center: Logo */}
                        <div className="flex-1 text-center flex justify-center">
                            <Link to="/" className="inline-block group relative">
                                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none text-black relative z-10 group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform duration-200">
                                    THRIFTX
                                </h1>
                                <span className="absolute inset-0 text-4xl md:text-6xl font-black italic tracking-tighter leading-none text-[#FF00FF] -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-200 select-none">
                                    THRIFTX
                                </span>
                            </Link>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">

                            {/* Desktop Links */}
                            <div className="hidden lg:flex items-center gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`font-mono text-sm font-bold uppercase px-2 py-1 border-2 border-transparent transition-all ${isActive(link.path)
                                            ? 'bg-black text-white border-black shadow-[3px_3px_0px_0px_rgba(255,0,255,1)]'
                                            : 'hover:border-black hover:bg-[#A6FAFF] hover:text-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="w-0.5 h-8 bg-black hidden lg:block rotate-12"></div>

                            {/* Icons & Buttons */}
                            <div className="flex items-center gap-4 md:gap-5">
                                <Link
                                    to="/sell"
                                    className="hidden md:flex items-center gap-2 font-mono text-sm font-bold uppercase border-2 border-black px-4 py-2 bg-[#FF90E8] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                                >
                                    Sell It
                                </Link>

                                <Link to="/wishlist" className="hidden sm:block p-2 border-2 border-transparent hover:border-black hover:bg-[#FFEB3B] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all rounded-none">
                                    <Heart size={24} strokeWidth={2} />
                                </Link>

                                <Link to="/checkout" className="relative group p-2 border-2 border-transparent hover:border-black hover:bg-[#00E5FF] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all rounded-none">
                                    <ShoppingBag size={24} strokeWidth={2} />
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] font-mono font-bold flex items-center justify-center border border-white">0</span>
                                </Link>

                                {/* User Profile Dropdown */}
                                <div className="relative" ref={profileRef}>
                                    {user ? (
                                        <button
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className="w-10 h-10 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden transition-all"
                                        >
                                            {user.picture ? (
                                                <img
                                                    src={user.picture.startsWith('http') ? user.picture : `${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.split('/api')[0] : 'http://localhost:5001'}/${user.picture.replace(/\\/g, '/')}`}
                                                    alt={user.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="font-mono font-bold text-lg">{user.name.charAt(0)}</span>
                                            )}
                                        </button>
                                    ) : (
                                        <Link to="/login" className="hidden sm:block">
                                            <div className="p-2 border-2 border-transparent hover:border-black hover:bg-[#50E3C2] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                                                <User size={24} strokeWidth={2} />
                                            </div>
                                        </Link>
                                    )}

                                    {/* Dropdown Menu */}
                                    {isProfileOpen && user && (
                                        <div className="absolute top-full right-0 mt-4 w-64 bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-0 z-50">
                                            <div className="px-4 py-3 border-b-2 border-black bg-[#F3F4F6]">
                                                <p className="font-bold text-black truncate font-mono uppercase">{user.name}</p>
                                                <p className="text-xs text-black/60 truncate font-mono">{user.email}</p>
                                            </div>

                                            <div className="p-2 space-y-1">
                                                {user.role === 'admin' && (
                                                    <Link
                                                        to="/admin/dashboard"
                                                        className="flex items-center gap-3 px-3 py-2 text-sm font-bold font-mono text-black hover:bg-[#FFEB3B] border-2 border-transparent hover:border-black transition-all"
                                                        onClick={() => setIsProfileOpen(false)}
                                                    >
                                                        <LayoutDashboard size={18} />
                                                        ADMIN PANEL
                                                    </Link>
                                                )}

                                                <Link
                                                    to="/dashboard"
                                                    className="flex items-center gap-3 px-3 py-2 text-sm font-bold font-mono text-black hover:bg-[#A6FAFF] border-2 border-transparent hover:border-black transition-all"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <Package size={18} />
                                                    DASHBOARD
                                                </Link>

                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold font-mono text-black hover:bg-[#FF90E8] border-2 border-transparent hover:border-black transition-all text-left"
                                                >
                                                    <LogOut size={18} />
                                                    LOGOUT
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Side Drawer (Neo-Brutalist) */}
            <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsOpen(false)}
                ></div>

                {/* Drawer Content */}
                <div className={`absolute top-0 left-0 w-[85%] max-w-sm h-full bg-white border-r-4 border-black transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="h-full flex flex-col relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#FFEB3B] rounded-full blur-3xl opacity-20 pointer-events-none"></div>

                        <div className="p-6 flex justify-between items-center border-b-2 border-black bg-white z-10">
                            <h2 className="text-3xl font-black italic">THRIFTX</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                            >
                                <X size={24} strokeWidth={2} />
                            </button>
                        </div>

                        <div className="flex-1 p-6 space-y-6 overflow-y-auto z-10">
                            <div className="flex flex-col space-y-3">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-xl font-mono font-bold uppercase py-3 border-b-2 border-black/10 hover:border-black hover:pl-4 transition-all ${isActive(link.path) ? 'text-black pl-4 border-black bg-[#A6FAFF]' : 'text-gray-500'}`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Link
                                    to="/sell"
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl font-mono font-bold uppercase py-3 border-b-2 border-black/10 hover:border-black hover:pl-4 transition-all text-[#FF00FF]"
                                >
                                    Sell It
                                </Link>
                            </div>

                            <div className="border-2 border-black p-4 bg-[#F3F4F6] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="font-mono text-xs font-bold uppercase mb-4 text-gray-500">My Account</p>
                                {user ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 border-2 border-black bg-white rounded-full flex items-center justify-center overflow-hidden">
                                                {user.picture ? (
                                                    <img src={user.picture} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={20} />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setIsOpen(false)}
                                                className="w-full py-2 text-center font-bold font-mono border-2 border-black hover:bg-[#50E3C2] transition-colors"
                                            >
                                                DASHBOARD
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full py-2 text-center font-bold font-mono border-2 border-black hover:bg-[#FF90E8] transition-colors"
                                            >
                                                LOGOUT
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full py-3 text-center font-bold font-mono border-2 border-black bg-black text-white hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(100,100,100,1)]"
                                    >
                                        LOGIN / SIGN UP
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;

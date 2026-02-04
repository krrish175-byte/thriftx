import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plus, Bell, User, Menu, X, LogOut } from 'lucide-react';

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
                    🎉 Happy Thanksgiving! Get 10% off on all accessories this week!
                </span>
            </div>

            {/* Main Navbar */}
            <nav className="w-full sticky top-0 z-50" style={{ backgroundColor: '#1a1a2e' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14">
                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* Logo */}
                        <Link to="/" className="flex items-center">
                            <span className="text-xl font-bold italic"
                                style={{
                                    background: 'linear-gradient(90deg, #4169E1 0%, #1E90FF 50%, #00BFFF 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                Campus Thrift
                            </span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-xs font-medium tracking-wide transition-colors ${isActive(link.path)
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Section: Sell Button + Icons */}
                        <div className="flex items-center space-x-4">
                            {/* Sell Button */}
                            <Link
                                to="/sell"
                                className="hidden sm:flex items-center gap-1 px-4 py-1.5 text-xs font-medium text-white border border-blue-500 rounded-md hover:bg-blue-500/10 transition-colors"
                            >
                                <Plus size={14} />
                                Sell
                            </Link>

                            {/* Notification Bell */}
                            <button className="text-gray-400 hover:text-white transition-colors">
                                <Bell size={18} />
                            </button>

                            {/* Profile / User Section */}
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
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
                                        <span className="hidden sm:inline text-xs font-medium uppercase truncate max-w-[100px]">{user.name.split(' ')[0]}</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-400 hover:text-red-400 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut size={16} />
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                                    <span className="hidden sm:inline text-xs font-medium">LOGIN</span>
                                    <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
                                        <User size={14} className="text-white" />
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


import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    // Single video requested by user (Skater/Urban)
    const videoSrc = "https://assets.mixkit.co/videos/44560/44560-720.mp4";

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">
            {/* Background Video */}
            <div className="absolute inset-0 bg-neutral-900">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    style={{ zIndex: 1 }}
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40 z-10"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-20">
                <span className="text-white text-sm md:text-base tracking-[0.2em] font-medium uppercase mb-4 animate-fade-in-up shadow-sm">
                    Sustainable Campus Fashion
                </span>
                <h1 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight max-w-4xl animate-fade-in-up delay-100 drop-shadow-2xl">
                    REDEFINE YOUR STYLE
                </h1>

                <div className="flex flex-col md:flex-row gap-4 animate-fade-in-up delay-200">
                    <Link to="/products?category=men" className="btn-primary bg-white text-black hover:bg-neutral-200 border-none min-w-[160px] font-bold tracking-wide">
                        Shop Men
                    </Link>
                    <Link to="/products?category=women" className="btn-outline border-2 border-white text-white hover:bg-white hover:text-black min-w-[160px] font-bold tracking-wide">
                        Shop Women
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block z-20">
                <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
            </div>

            {/* Seamless Fade into Content */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent z-10" />
        </div>
    );
};

export default Hero;

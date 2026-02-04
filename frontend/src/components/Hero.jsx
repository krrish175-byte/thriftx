import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-neutral-100">
            {/* Background Image */}
            {/* Background Image/Video */}
            <div className="absolute inset-0 bg-neutral-900">
                {/* Placeholder Image (Visible until video loads) */}
                <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                    alt="Campus Fashion"
                    className={`w-full h-full object-cover object-center brightness-[0.85] transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
                />

                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    onCanPlay={() => setIsVideoLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                >
                    <source src="https://assets.mixkit.co/videos/44560/44560-720.mp4" type="video/mp4" />

                </video>

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                <span className="text-white text-sm md:text-base tracking-[0.2em] font-medium uppercase mb-4 animate-fade-in-up">
                    Sustainable Campus Fashion
                </span>
                <h1 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight max-w-4xl animate-fade-in-up delay-100">
                    REDEFINE YOUR STYLE
                </h1>

                <div className="flex flex-col md:flex-row gap-4 animate-fade-in-up delay-200">
                    <Link to="/products?category=men" className="btn-primary bg-white text-primary hover:bg-neutral-200 border-none min-w-[160px]">
                        Shop Men
                    </Link>
                    <Link to="/products?category=women" className="btn-outline border-white text-white hover:bg-white hover:text-primary min-w-[160px]">
                        Shop Women
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </div>
    );
};

export default Hero;

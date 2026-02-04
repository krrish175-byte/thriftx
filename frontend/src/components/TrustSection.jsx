import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, BarChart3, Sparkles } from 'lucide-react';

const TrustSection = () => {
    const cards = [
        {
            title: "Peer-to-Peer Identity",
            desc: "Exclusively for our community. Every account is cross-referenced with university records, ensuring you’re only dealing with real students.",
            icon: <ShieldCheck className="w-7 h-7" />,
            size: "col-span-12 md:col-span-7",
        },
        {
            title: "Secure Exchange Vault",
            desc: "Shop with zero hesitation. Your payment is held in our neutral vault until you approve the purchase.",
            icon: <Lock className="w-7 h-7" />,
            size: "col-span-12 md:col-span-5",
        },
        {
            title: "Integrity Metrics",
            desc: "Our rigorous 'Alpha-Grade' scale ensures total transparency on every item's condition.",
            icon: <BarChart3 className="w-7 h-7" />,
            size: "col-span-12 md:col-span-4",
        },
        {
            title: "Freshness Protocol",
            desc: "Arrives ready to wear. Opt for professional sanitation to have your items steam-cleaned before the hand-off.",
            icon: <Sparkles className="w-7 h-7" />,
            size: "col-span-12 md:col-span-8",
        }
    ];

    return (
        <section className="relative -mt-12 bg-slate-100 pt-32 pb-32 px-6 text-slate-900 rounded-[2rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] z-20 border border-slate-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-8 h-[2px] bg-blue-600"></span>
                        <p className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">The Campus Standard</p>
                    </div>
                    <h2 className="text-5xl font-heading font-black text-slate-900 leading-tight">
                        Built for Students, <br className="hidden sm:block" /> by Students.
                    </h2>
                    <p className="text-slate-600 max-w-lg mt-6 text-lg italic border-l-2 border-blue-600/30 pl-6">
                        "An ecosystem built on transparency, safety, and student-led quality."
                    </p>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10, scale: 1.01 }}
                            className={`${card.size} group relative overflow-hidden rounded-[3rem] bg-white p-10 border border-slate-200/50 hover:border-blue-600/30 transition-all duration-500 shadow-xl hover:shadow-2xl`}
                        >
                            <div className="flex flex-col h-full justify-between gap-12 relative z-10">
                                <div className="p-4 w-fit rounded-2xl bg-slate-50 text-blue-600 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500">
                                    {card.icon}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{card.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                                        {card.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Animated background glow */}
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-600/[0.05] blur-[100px] rounded-full group-hover:bg-blue-600/10 transition-all duration-700"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSection;

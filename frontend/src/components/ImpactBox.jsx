import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, Trees } from 'lucide-react';

const ImpactBox = ({ compact = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden ${compact
                    ? 'bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl'
                    : 'bg-gradient-to-br from-emerald-50 to-teal-50/30 border border-emerald-100 p-6 rounded-2xl shadow-sm'
                }`}
        >
            {/* Decorative background leaf */}
            <Leaf
                className="absolute -right-4 -top-4 text-emerald-100/50 rotate-12"
                size={80}
            />

            <div className="relative z-10">
                <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                        <div className={`mt-1 p-2 rounded-lg bg-emerald-100 text-emerald-700`}>
                            <Leaf size={compact ? 16 : 20} fill="currentColor" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <span className={`${compact ? 'text-lg' : 'text-2xl'} font-black text-emerald-900 tracking-tight`}>
                                    4.2kg CO₂ Saved
                                </span>
                                <span className="text-[10px] font-black text-white bg-emerald-600 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    +12 Points
                                </span>
                            </div>
                            <p className="text-emerald-700 text-xs font-bold mt-1 flex items-center gap-1.5 italic">
                                <Trees size={12} />
                                This purchase helps restore campus greenery
                            </p>
                        </div>
                    </div>
                </div>

                {!compact && (
                    <div className="mt-6 pt-4 border-t border-emerald-200/50 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                <Zap size={10} className="text-emerald-700" fill="currentColor" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-emerald-900 uppercase tracking-tighter">Manufacturing</span>
                                <span className="text-[9px] font-bold text-emerald-600">Saved 3.1kg CO₂</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                <Zap size={10} className="text-emerald-700" fill="currentColor" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-emerald-900 uppercase tracking-tighter">Logistics</span>
                                <span className="text-[9px] font-bold text-emerald-600">Reduced 1.1kg CO₂</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ImpactBox;

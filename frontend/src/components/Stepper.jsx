import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const Stepper = ({ currentStep, steps }) => {
    return (
        <div className="flex items-center justify-between mb-8 px-4 relative">
            {/* Background Line */}
            <div className="absolute top-5 left-0 w-full h-1 bg-slate-200 -z-20 transform -translate-y-1/2"></div>

            {/* Active Line */}
            <motion.div
                className="absolute top-5 left-0 h-1 bg-slate-900 -z-10 transform -translate-y-1/2"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {steps.map((step, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = stepNum < currentStep;

                return (
                    <motion.div
                        key={step.label}
                        className="flex flex-col items-center relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <motion.div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${isCompleted
                                    ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                                    : isActive
                                        ? 'bg-slate-900 text-white ring-4 ring-slate-200 shadow-xl'
                                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                                }`}
                            animate={{ scale: isActive ? 1.1 : 1 }}
                        >
                            {isCompleted ? <Check size={20} /> : stepNum}
                        </motion.div>
                        <span className={`text-xs font-semibold mt-2 uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-400'
                            }`}>
                            {step.label}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default Stepper;

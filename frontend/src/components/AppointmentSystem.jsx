import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock } from 'lucide-react';

const AppointmentSystem = ({ onClose, onConfirm, sellerName }) => {
    const [selectedSlot, setSelectedSlot] = useState(null);

    const timeSlots = [
        '10:30 AM', '11:15 AM', '01:45 PM',
        '03:00 PM', '04:15 PM', '05:30 PM'
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-neutral-900/80 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.95 }}
                className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors"
                >
                    <X size={20} className="text-neutral-900" />
                </button>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-bold tracking-widest uppercase text-neutral-500">Live Availability</span>
                    </div>
                    <h3 className="text-[#121212] font-heading font-black text-3xl mb-3 leading-tight">
                        Schedule<br />Hand-off
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                        Select a verified window for the Freshness Protocol inspection with <span className="font-bold text-neutral-900">{sellerName || 'the seller'}</span>.
                    </p>
                </div>

                {/* Location Pin */}
                <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-2xl border border-neutral-100 mb-8">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-neutral-200 shadow-sm">
                        <MapPin size={18} className="text-[#121212]" />
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase text-neutral-400">Verified Exchange Point</p>
                        <p className="text-sm font-bold text-[#121212]">Student Center ~ Zone B</p>
                    </div>
                </div>

                {/* Time Slot Grid */}
                <div className="mb-8">
                    <p className="text-xs font-bold uppercase text-neutral-400 mb-4 flex items-center gap-2">
                        <Clock size={12} />
                        Available Slots (15 mins)
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map((time) => (
                            <motion.button
                                key={time}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedSlot(time)}
                                className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border-2 ${selectedSlot === time
                                        ? 'bg-[#121212] text-white border-[#121212] shadow-lg'
                                        : 'bg-white text-neutral-600 border-neutral-100 hover:border-neutral-300'
                                    }`}
                            >
                                {time}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectedSlot && onConfirm(selectedSlot)}
                    disabled={!selectedSlot}
                    className={`w-full py-5 rounded-2xl font-bold text-sm tracking-widest uppercase shadow-xl transition-all ${selectedSlot
                            ? 'bg-[#121212] text-white cursor-pointer hover:shadow-2xl'
                            : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                        }`}
                >
                    Confirm Appointment
                </motion.button>
            </motion.div>
        </div>
    );
};

export default AppointmentSystem;

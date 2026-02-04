import React, { useState } from 'react';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';

const Checkout = () => {
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('upi');

    const handlePayment = (e) => {
        e.preventDefault();
        alert("Opening Razorpay Payment Gateway...");
        // Integration with Razorpay logic would go here
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Forms */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. Delivery Address */}
                        <div className={`bg-white p-6 rounded-2xl shadow-sm border ${step === 1 ? 'border-primary ring-1 ring-primary' : 'border-slate-100'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-slate-800">1. Delivery Address</h2>
                                {step > 1 && <button onClick={() => setStep(1)} className="text-primary text-sm font-medium">Edit</button>}
                            </div>

                            {step === 1 ? (
                                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="First Name" className="w-full px-4 py-2 border rounded-xl" required />
                                        <input type="text" placeholder="Last Name" className="w-full px-4 py-2 border rounded-xl" required />
                                    </div>
                                    <input type="text" placeholder="Address Line 1 (Hostel/Room No)" className="w-full px-4 py-2 border rounded-xl" required />
                                    <input type="text" placeholder="City" className="w-full px-4 py-2 border rounded-xl" defaultValue="Mumbai" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="State" className="w-full px-4 py-2 border rounded-xl" defaultValue="Maharashtra" />
                                        <input type="text" placeholder="ZIP Code" className="w-full px-4 py-2 border rounded-xl" required />
                                    </div>
                                    <button type="submit" className="px-6 py-2 bg-slate-900 text-white rounded-xl font-medium">Continue</button>
                                </form>
                            ) : (
                                <p className="text-slate-600">Juhu Scheme, Vile Parle West, Mumbai, 400056</p>
                            )}
                        </div>

                        {/* 2. Payment Method */}
                        <div className={`bg-white p-6 rounded-2xl shadow-sm border ${step === 2 ? 'border-primary ring-1 ring-primary' : 'border-slate-100'}`}>
                            <h2 className="text-xl font-bold text-slate-800 mb-4">2. Payment Method</h2>

                            {step === 2 ? (
                                <div className="space-y-4">
                                    <div className={`p-4 border rounded-xl cursor-pointer flex items-center ${paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-slate-200'}`} onClick={() => setPaymentMethod('upi')}>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'upi' ? 'border-primary' : 'border-slate-300'}`}>
                                            {paymentMethod === 'upi' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                                        </div>
                                        <span className="font-medium text-slate-900">UPI (GPay, PhonePe, Paytm)</span>
                                    </div>

                                    <div className={`p-4 border rounded-xl cursor-pointer flex items-center ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-slate-200'}`} onClick={() => setPaymentMethod('card')}>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'card' ? 'border-primary' : 'border-slate-300'}`}>
                                            {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                                        </div>
                                        <span className="font-medium text-slate-900">Credit / Debit Card</span>
                                    </div>

                                    <div className={`p-4 border rounded-xl cursor-pointer flex items-center ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-slate-200'}`} onClick={() => setPaymentMethod('cod')}>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${paymentMethod === 'cod' ? 'border-primary' : 'border-slate-300'}`}>
                                            {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                                        </div>
                                        <span className="font-medium text-slate-900">Cash on Delivery</span>
                                    </div>

                                    <button onClick={handlePayment} className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg mt-4 flex items-center justify-center">
                                        <ShieldCheck size={20} className="mr-2" />
                                        Pay Securely
                                    </button>
                                </div>
                            ) : (
                                <p className="text-slate-400 text-sm">Fill address to continue</p>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6 border-b border-slate-100 pb-6">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=200" alt="Item" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">Vintage Nike Hoodie</h4>
                                    <p className="text-xs text-slate-500">Size L</p>
                                    <p className="text-sm font-bold text-slate-900 mt-1">₹1,200</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-slate-600 mb-6 border-b border-slate-100 pb-6">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹1,200</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span>₹50</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Platform Fee (Waived)</span>
                                <span>-₹20</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-lg font-bold text-slate-900 mb-6">
                            <span>Total</span>
                            <span>₹1,250</span>
                        </div>

                        <div className="bg-green-50 p-4 rounded-xl flex items-start">
                            <ShieldCheck size={18} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                            <p className="text-xs text-green-700">Money held in Escrow until you confirm delivery. 100% Refund if item not as described.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

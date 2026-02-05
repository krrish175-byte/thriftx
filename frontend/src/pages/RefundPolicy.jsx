import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="bg-[#121212] min-h-screen text-white font-sans py-32 px-6 lg:px-20">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16 border-b border-white/10 pb-12">
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6 underline decoration-blue-500 decoration-8 underline-offset-8">Refund Policy</h1>
                    <p className="text-blue-400 text-sm uppercase tracking-[0.3em] font-black">Last updated: November 1, 2025</p>
                </header>

                <div className="space-y-16 text-gray-400 leading-relaxed text-lg">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-[0.1em]">1. Overview</h2>
                        <p>
                            At Campus ThriftX, we facilitate high-integrity peer-to-peer commerce. This Refund Policy outlines the framework for resolution when transactions do not meet the expected standards of our campus ecosystem.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-[0.1em]">2. Eligible Refund Criteria</h2>
                        <p className="mb-8 font-medium text-gray-300">Refunds are traditionally processed through our secure dispute resolution protocol in the following scenarios:</p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 hover:border-blue-500/20 transition-all">
                                <h3 className="font-bold text-xl mb-4 text-blue-400">Inventory Discrepancy</h3>
                                <ul className="list-disc list-inside space-y-3 text-sm">
                                    <li>Significant deviation from description</li>
                                    <li>Unreported structural damage</li>
                                    <li>Inaccurate sizing or measurements</li>
                                    <li>Authenticity concerns</li>
                                </ul>
                            </div>
                            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 hover:border-purple-500/20 transition-all">
                                <h3 className="font-bold text-xl mb-4 text-purple-400">Fulfillment Failure</h3>
                                <ul className="list-disc list-inside space-y-3 text-sm">
                                    <li>Seller no-show at exchange location</li>
                                    <li>Item not transmitted within timeframe</li>
                                    <li>Order cancellation post-payment</li>
                                    <li>Verified operational technical errors</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-[0.1em]">3. The Resolution Pipeline</h2>

                        <div className="space-y-10">
                            {[
                                { step: "Dispatch", title: "Initiate Dispute", text: "Raise a ticket via your dashboard within 24 hours of the failed transaction with photographic evidence." },
                                { step: "Review", title: "Protocol Audit", text: "Our community moderators review the case, cross-referencing chat history and transaction logs." },
                                { step: "Execute", title: "Automated Reversal", text: "Once approved, funds are automatically reversed to the original payment source within 5-7 campus cycles." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-8 group">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-blue-600 transition-colors">
                                        <span className="text-white font-black text-xs">{idx + 1}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-2 text-white">{item.title}</h3>
                                        <p className="text-sm">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-neutral-900 p-12 rounded-[3.5rem] border border-white/5">
                        <h2 className="text-2xl font-bold text-white mb-6 italic font-serif tracking-tight">Support Terminal</h2>
                        <ul className="space-y-4 text-sm">
                            <li className="flex justify-between border-b border-white/5 pb-4">
                                <span className="text-gray-500 uppercase tracking-widest font-bold">Email</span>
                                <span className="text-blue-400 font-bold">refunds@campusthrift.com</span>
                            </li>
                            <li className="flex justify-between border-b border-white/5 pb-4">
                                <span className="text-gray-500 uppercase tracking-widest font-bold">Latency</span>
                                <span className="text-white">Within 24 Operational Hours</span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;

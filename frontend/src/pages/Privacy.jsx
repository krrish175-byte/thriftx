import React from 'react';

const Privacy = () => {
    return (
        <div className="bg-[#121212] min-h-screen text-white font-sans py-32 px-6 lg:px-20">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16 border-b border-white/10 pb-12">
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6">Privacy Policy</h1>
                    <p className="text-purple-400 text-sm uppercase tracking-[0.3em] font-black">Last Updated: November 5, 2025</p>
                </header>

                <div className="space-y-16 text-gray-400 leading-relaxed text-lg">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">1. Data Architecture</h2>
                        <p>
                            At Campus ThriftX, we respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you interact with our campus ecosystem.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">2. Information Collection</h2>
                        <p className="mb-6">
                            We collect information necessary to maintain a secure and verified campus environment:
                        </p>
                        <ul className="grid md:grid-cols-2 gap-4">
                            <li className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <span className="text-white font-bold block mb-2">Identity Data</span>
                                Name, college email, and student ID for verification.
                            </li>
                            <li className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <span className="text-white font-bold block mb-2">Usage Data</span>
                                Interaction history and preferences within the app.
                            </li>
                            <li className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <span className="text-white font-bold block mb-2">Content Data</span>
                                Photographs and descriptions of items you list.
                            </li>
                            <li className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <span className="text-white font-bold block mb-2">Location Data</span>
                                General campus location for facilitating hand-offs.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">3. Security Protocal</h2>
                        <p>
                            We implement industry-standard security measures to protect your information. Your student ID data is encrypted and used solely for the verification process, accessible only by our secure verification systems.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">4. Your Sovereignty</h2>
                        <p>
                            You have the right to access, rectify, or delete your personal data at any time. You can manage your privacy settings directly from your account dashboard.
                        </p>
                    </section>

                    <section className="bg-purple-600/10 p-12 rounded-[3rem] border border-purple-500/20">
                        <h2 className="text-2xl font-bold text-white mb-6">Privacy Concierge</h2>
                        <p className="text-white/80 mb-0">
                            Questions about your data? Reach out to our privacy officer: <br />
                            <span className="font-bold text-purple-400">privacy@campusthrift.com</span>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;

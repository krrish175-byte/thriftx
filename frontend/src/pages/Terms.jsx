import React from 'react';

const Terms = () => {
    return (
        <div className="bg-[#121212] min-h-screen text-white font-sans py-32 px-6 lg:px-20">
            <div className="max-w-4xl mx-auto">
                <header className="mb-16 border-b border-white/10 pb-12">
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6">Terms of Service</h1>
                    <p className="text-blue-400 text-sm uppercase tracking-[0.3em] font-black">Effective Date: November 1, 2025</p>
                </header>

                <div className="space-y-16 text-gray-400 leading-relaxed text-lg">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the Campus ThriftX platform, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services. We reserve the right to modify these terms at any time, and your continued use of the platform constitutes acceptance of those changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">2. Eligibility & Registration</h2>
                        <p className="mb-6">
                            Campus ThriftX is exclusively for registered students and faculty of verified educational institutions.
                        </p>
                        <ul className="list-disc pl-5 space-y-4">
                            <li>You must provide a valid college email address and student ID for verification.</li>
                            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                            <li>You must provide accurate and complete information during the registration process.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">3. Trading & Selling</h2>
                        <p className="mb-6">
                            Users are solely responsible for the items they list and the transactions they enter into.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                                <h3 className="text-white font-bold mb-4">Prohibited Items</h3>
                                <p className="text-sm">Illegal substances, weapons, counterfeit goods, and items violating campus safety protocols are strictly forbidden.</p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                                <h3 className="text-white font-bold mb-4">Authenticity</h3>
                                <p className="text-sm">Sellers must provide honest descriptions and clear photographs of the items being sold.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">4. Safety & Conduct</h2>
                        <p>
                            Safety is our priority. Transactions should ideally take place in public, well-lit areas on campus. Any form of harassment, fraud, or inappropriate behavior will result in immediate and permanent suspension from the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">5. Limitation of Liability</h2>
                        <p>
                            Campus ThriftX acts as a marketplace. We do not own the items listed and are not party to the actual transactions between users. We are not liable for any losses, damages, or disputes arising from user interactions.
                        </p>
                    </section>

                    <section className="bg-blue-600/10 p-12 rounded-[3rem] border border-blue-500/20">
                        <h2 className="text-2xl font-bold text-white mb-6">Contact Legal</h2>
                        <p className="text-white/80 mb-0">
                            For legal inquiries or report violations, please contact: <br />
                            <span className="font-bold text-blue-400">legal@campusthrift.com</span>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RefundPolicy = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col font-sans text-neutral-900">
            <Navbar />

            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <header className="mb-12 border-b border-neutral-200 pb-8">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-4">Refund Policy</h1>
                    <p className="text-neutral-500 text-sm uppercase tracking-wider font-medium">Last updated: November 1, 2025</p>
                </header>

                <div className="space-y-12 text-neutral-800 leading-relaxed">

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-heading">1. Overview</h2>
                        <p>
                            At Campus Thrift, we strive to ensure customer satisfaction with every transaction. This Refund Policy outlines the circumstances under which refunds may be issued and the procedures for requesting them.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-heading">2. Eligible Refunds</h2>
                        <p className="mb-4">Refunds may be issued under the following circumstances:</p>

                        <div className="pl-4 border-l-2 border-neutral-200 space-y-4">
                            <div>
                                <h3 className="font-bold text-lg mb-2">Seller-Initiated Refunds</h3>
                                <ul className="list-disc list-inside space-y-1 text-neutral-600">
                                    <li>Item is significantly different from description</li>
                                    <li>Item is damaged or defective</li>
                                    <li>Item is not received by buyer</li>
                                    <li>Mutual agreement between buyer and seller</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">Platform-Initiated Refunds</h3>
                                <ul className="list-disc list-inside space-y-1 text-neutral-600">
                                    <li>Violation of Campus Thrift policies</li>
                                    <li>Fraudulent transactions</li>
                                    <li>Technical errors on our platform</li>
                                    <li>Disputes resolved in buyer's favor</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-heading">3. Non-Refundable Items</h2>
                        <p className="mb-4">The following situations are generally not eligible for refunds:</p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-600">
                            <li>Change of mind or buyer's remorse</li>
                            <li>Items that have been used or damaged by buyer</li>
                            <li>Items returned after the specified timeframe</li>
                            <li>Digital products or services already consumed</li>
                            <li>Items prohibited by our terms and conditions</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-heading">4. Refund Process</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-lg mb-2">Step 1: Initiate Dispute</h3>
                                <p className="mb-2 text-neutral-600">If you believe you are eligible for a refund, start by initiating a dispute through our platform. Provide detailed information about the issue, including:</p>
                                <ul className="list-disc list-inside text-neutral-600 ml-4">
                                    <li>Order number and transaction details</li>
                                    <li>Description of the problem</li>
                                    <li>Supporting evidence (photos, messages, etc.)</li>
                                    <li>Requested resolution (refund, replacement, etc.)</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg mb-2">Step 2: Platform Review</h3>
                                <p className="text-neutral-600">Our team will review the dispute within 3-5 business days. Both parties will be given an opportunity to provide their side of the story.</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg mb-2">Step 3: Resolution</h3>
                                <p className="text-neutral-600">Once a decision is made, both parties will be notified. Approved refunds will be processed within 5-7 business days.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-heading">5. Refund Methods</h2>
                        <p className="mb-4">Refunds will be processed using the original payment method:</p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-600">
                            <li><strong>Online Payments:</strong> Refunded to the original payment source (UPI, card, wallet)</li>
                            <li><strong>Cash on Delivery:</strong> Refunded via bank transfer or as store credit</li>
                            <li><strong>Processing Time:</strong> 5-7 business days for online payments, 7-10 business days for bank transfers</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-heading">6. Partial Refunds</h2>
                        <p className="mb-2">In some cases, partial refunds may be issued:</p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-600">
                            <li>Items returned in used or damaged condition</li>
                            <li>Resolution of disputes where both parties share responsibility</li>
                            <li>Platform fees or shipping costs may be deducted</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-heading">7. Cancellation Policy</h2>
                        <p className="mb-4">Orders can be cancelled before the item is shipped. Once shipped, cancellation requests will be treated as return requests subject to our refund policy.</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                                <h4 className="font-bold text-sm uppercase text-neutral-500 mb-1">Before Shipping</h4>
                                <p className="font-medium">Full refund within 24 hours</p>
                            </div>
                            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                                <h4 className="font-bold text-sm uppercase text-neutral-500 mb-1">After Shipping</h4>
                                <p className="font-medium">Subject to return & refund policy</p>
                            </div>
                            <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                                <h4 className="font-bold text-sm uppercase text-neutral-500 mb-1">Custom Orders</h4>
                                <p className="font-medium">Cancellation may not be possible once production begins</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-heading">8. Contact Us</h2>
                        <div className="bg-neutral-900 text-white p-6 rounded-xl">
                            <p className="mb-4 font-medium">For refund-related inquiries, please contact our support team:</p>
                            <ul className="space-y-2 text-sm text-neutral-300">
                                <li className="flex items-center gap-3">
                                    <span className="w-24 text-neutral-500 font-bold uppercase text-xs">Email</span>
                                    <span>refunds@campusthrift.com</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-24 text-neutral-500 font-bold uppercase text-xs">Hours</span>
                                    <span>Monday - Friday, 9:00 AM - 6:00 PM IST</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-24 text-neutral-500 font-bold uppercase text-xs">Response</span>
                                    <span>Within 24 hours</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 font-heading">9. Policy Updates</h2>
                        <p className="text-neutral-600 italic">
                            This refund policy may be updated periodically. Users will be notified of significant changes via email or platform notifications. Continued use of Campus Thrift after policy updates constitutes acceptance of the new terms.
                        </p>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RefundPolicy;

import React from 'react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-heading font-medium tracking-tight mb-8 text-black">
                    Contact Us
                </h1>
                <p className="text-neutral-600 text-lg mb-12">
                    Have questions or need help? Our team is here for you.
                </p>
                <div className="grid md:grid-cols-2 gap-12 text-left">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">Email Us</h2>
                        <p className="text-neutral-600">support@campusthrift.com</p>
                        <p className="text-neutral-400 text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-black">Follow Us</h2>
                        <p className="text-neutral-600">@campusthrift on all platforms</p>
                    </div>
                </div>
                <div className="mt-20 p-8 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <h2 className="text-2xl font-bold text-black mb-4">Visit Our Office</h2>
                    <p className="text-neutral-600">NMIMS Campus, Mumbai, India</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;

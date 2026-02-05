import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-heading font-medium tracking-tight mb-8 text-black">
                    About Campus Thrift
                </h1>
                <div className="prose prose-lg text-neutral-600 space-y-6">
                    <p>
                        Welcome to Campus Thrift, the premier destination for students to buy, sell, and trade within their campus community.
                    </p>
                    <p>
                        Our mission is to promote sustainability and affordability by giving a second life to high-quality items. Whether you're looking for vintage finds, campus essentials, or the perfect graduation gift, we've got you covered.
                    </p>
                    <h2 className="text-2xl font-bold text-black pt-6">Our Values</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Sustainability:</strong> Reducing waste by encouraging reuse.</li>
                        <li><strong>Community:</strong> Building stronger ties within the student body.</li>
                        <li><strong>Affordability:</strong> Making quality items accessible on a student budget.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;

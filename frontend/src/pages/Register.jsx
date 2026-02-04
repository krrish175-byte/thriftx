import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Register = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Create Account</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Join the student thrift community
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">First Name</label>
                                <input id="firstName" name="firstName" type="text" required className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">Last Name</label>
                                <input id="lastName" name="lastName" type="text" required className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">College Email (@nmims.edu)</label>
                            <input id="email" name="email" type="email" required className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                            <input id="password" name="password" type="password" required className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                Sign up
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-sm text-slate-600">
                            Already have an account? <Link to="/login" className="font-medium text-primary hover:text-primary-dark">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

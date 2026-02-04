import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await api.post('/auth/register', {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password
            });
            // Store token in localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            // Redirect to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error('Register error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Create Account</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Join the student thrift community
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">First Name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">Last Name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                            >
                                {loading ? 'Creating account...' : 'Sign up'}
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

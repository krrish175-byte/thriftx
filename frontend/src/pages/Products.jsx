import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import { Filter, ChevronDown } from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        sort: 'newest'
    });

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Header & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-neutral-100 pb-6">
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-primary mb-2">SHOP ALL</h1>
                        <p className="text-neutral-500">Discover unique finds from students.</p>
                    </div>

                    <div className="flex gap-4 mt-4 md:mt-0">
                        <button className="flex items-center px-5 py-2.5 bg-white border border-neutral-200 text-sm font-medium text-primary hover:border-black transition uppercase tracking-wide">
                            <Filter size={16} className="mr-2" />
                            Filters
                        </button>
                        <div className="relative">
                            <button className="flex items-center px-5 py-2.5 bg-white border border-neutral-200 text-sm font-medium text-primary hover:border-black transition uppercase tracking-wide">
                                Sort: Newest
                                <ChevronDown size={14} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;

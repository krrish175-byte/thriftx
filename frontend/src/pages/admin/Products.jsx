import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Navbar from '../../components/Navbar';
import { Search, Loader, Trash2, ExternalLink, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('ALL'); // ALL, ACTIVE, SOLD

    useEffect(() => {
        fetchProducts(1);
    }, []);

    const fetchProducts = async (pageArg) => {
        setLoading(true);
        try {
            const res = await api.get(`/admin/products?page=${pageArg}&limit=10`);
            setProducts(res.data.products || []);
            setTotalPages(res.data.totalPages || 1);
            setPage(res.data.currentPage || 1);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchProducts(newPage);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    const getStatusColor = (isSold) => {
        return isSold
            ? 'bg-green-100 text-green-800 border-green-200'
            : 'bg-blue-100 text-blue-800 border-blue-200';
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.seller?.name.toLowerCase().includes(searchTerm.toLowerCase());

        if (filter === 'ALL') return matchesSearch;
        if (filter === 'SOLD') return matchesSearch && product.isSold;
        if (filter === 'ACTIVE') return matchesSearch && !product.isSold;

        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Products Management</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Monitor and manage all listings on the platform
                        </p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
                        {['ALL', 'ACTIVE', 'SOLD'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === f
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full sm:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-slate-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products or sellers..."
                            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader className="animate-spin text-primary" size={32} />
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Seller</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {filteredProducts.map((product) => (
                                        <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                        {product.images && product.images.length > 0 ? (
                                                            <img className="h-10 w-10 object-cover" src={`http://localhost:5001/${product.images[0]}`} alt="" />
                                                        ) : (
                                                            <Package size={20} className="text-slate-400" />
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-slate-900">{product.title}</div>
                                                        <div className="text-sm text-slate-500">{product.category}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                                        {product.seller?.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-slate-900">{product.seller?.name || 'Unknown'}</div>
                                                        <div className="text-xs text-slate-500">{product.seller?.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-slate-900">₹{product.price}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(product.isSold)}`}>
                                                    {product.isSold ? 'Sold' : 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                                {new Date(product.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-3">
                                                    <Link to={`/product/${product._id}`} target="_blank" className="text-blue-600 hover:text-blue-900" title="View">
                                                        <ExternalLink size={18} />
                                                    </Link>
                                                    <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900" title="Delete">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Package size={48} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-lg font-medium text-slate-900">No products found</h3>
                            <p className="mt-1 text-slate-500">Try adjusting your search or filters</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && products.length > 0 && (
                        <div className="p-4 border-t border-slate-200 flex justify-between items-center bg-slate-50">
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-transparent transition-all"
                            >
                                <ChevronLeft size={20} className="text-slate-600" />
                            </button>
                            <span className="text-sm font-medium text-slate-600">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                                className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:border-transparent transition-all"
                            >
                                <ChevronRight size={20} className="text-slate-600" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;

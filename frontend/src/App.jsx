import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Sell from './pages/Sell';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Blog from './pages/Blog';
import Wishlist from './pages/Wishlist';
import MyOffers from './pages/MyOffers';
import RefundPolicy from './pages/RefundPolicy';
import Orders from './pages/Orders';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import SubmitStory from './pages/SubmitStory';
import ScrollToTop from './components/ScrollToTop';

// Admin imports
import AdminRoute from './components/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Transactions from './pages/admin/Transactions';
import AdminProducts from './pages/admin/Products';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes - Nested under AdminLayout and protected by AdminRoute */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} /> {/* Redirects to dashboard if needed, or just loads dashboard */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>
        </Route>

        {/* Main App Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/sell" element={<Layout><Sell /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/profile" element={<Layout><Dashboard /></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/blog" element={<Layout><Blog /></Layout>} />
        <Route path="/submit-story" element={<Layout><SubmitStory /></Layout>} />
        <Route path="/wishlist" element={<Layout><Wishlist /></Layout>} />
        <Route path="/my-offers" element={<Layout><MyOffers /></Layout>} />
        <Route path="/orders" element={<Layout><Orders /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/refund" element={<Layout><RefundPolicy /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;

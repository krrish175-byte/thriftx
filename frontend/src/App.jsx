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
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/my-offers" element={<MyOffers />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


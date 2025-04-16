import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './features/auth/authSlice'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Events from './pages/Events';
import Marketplace from './pages/Marketplace';
import Artwork from './pages/Artwork'
import Wishlist from './pages/Wishlist';
import SellerDashboard from './pages/SellerDashboard';
import UploadArtwork from './pages/UploadArtwork';
import EditArtwork from './pages/EditArtwork';
import Cart from './pages/Cart';
import PaymentSuccess from './pages/PaymentSuccess';


const AppContent = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // ✅ Rehydrate Redux from localStorage on app load
  useEffect(() => {
    const stored = localStorage.getItem('userData');
    if (stored) {
      dispatch(setUser(JSON.parse(stored)));
    }
  }, [dispatch]); 

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/artwork/:id" element={<Artwork />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/sellerDashboard" element={<SellerDashboard />} />
        <Route path="/uploadArtwork" element={<UploadArtwork />} />
        <Route path="/edit/:id" element={<EditArtwork />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;

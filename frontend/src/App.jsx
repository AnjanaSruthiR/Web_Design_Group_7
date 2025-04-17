import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoutes';
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
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard';
import UploadArtwork from './pages/UploadArtwork';
import EditArtwork from './pages/EditArtwork';
import Cart from './pages/Cart';
import PaymentSuccess from './pages/PaymentSuccess';
import EventDetails from './pages/EventDetails';


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
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/artwork/:id" element={<Artwork />} />

        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />    

        <Route
          path="/userdashboard"
          element={
            <PrivateRoute roles={['user']}>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admindashboard"
          element={
            <PrivateRoute roles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/sellerDashboard"
          element={
            <PrivateRoute >
              <SellerDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/uploadArtwork"
          element={
            <PrivateRoute >
              <UploadArtwork />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditArtwork />
            </PrivateRoute>
          }
        />
        <Route path="/unauthorized" element={<h2>Unauthorized</h2>} />
      </Routes >
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;

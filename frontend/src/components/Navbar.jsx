import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  let dashboardPath = '/dashboard';
  let role = null;
  
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      if (decoded.role === 'admin') dashboardPath = '/adminDashboard';
      else if (decoded.userType === 'seller') dashboardPath = '/sellerDashboard';
      else dashboardPath = '/userDashboard';
    } catch (e) {
      console.error('Invalid token:', e);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">PaletteSquare</Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/events"
                className="nav-link"
                style={{ fontSize: '1.25rem', fontWeight: '500' }}
              >
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/marketplace"
                className="nav-link"
                style={{ fontSize: '1.25rem', fontWeight: '500' }}
              >
                ArtWorks
              </Link>
            </li>
              {/* only show Cart if user is logged in and NOT an admin */}
              {isLoggedIn && role !== 'admin' && (
              <li className="nav-item">
                <Link to="/cart" className="nav-link" style={{ fontSize: '1.25rem', fontWeight: 500 }}>
                  Cart
                </Link>
              </li>
            )}
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-primary me-2">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-secondary">Sign Up</Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#!"
                  id="profileDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="/assets/profile.png"
                    alt="Profile"
                    style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                  <li>
                    <Link className="dropdown-item" to={dashboardPath}>Dashboard</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" to="/wishlist">Wishlist</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

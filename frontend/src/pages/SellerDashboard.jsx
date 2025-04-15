import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchSellerArtworks = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3002/api/artworks/seller', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to fetch artworks');

      const data = await response.json();
      setArtworks(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerArtworks();
  }, []);

  const handleDelete = async (artworkId) => {
    const token = localStorage.getItem('token');
    if (!window.confirm("Are you sure you want to delete this artwork?")) return;

    try {
      const response = await fetch(`http://localhost:3002/api/artworks/${artworkId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to delete artwork');
      setArtworks((prev) => prev.filter((art) => art._id !== artworkId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="container my-5 seller-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Artworks</h1>
        <Link to="/upload" className="btn btn-success">➕ Add New Artwork</Link>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-danger text-center">Error: {error}</div>}

      {artworks.length === 0 && !loading ? (
        <div className="text-center">
          <p>You haven't listed any artworks yet.</p>
          <Link to="/upload" className="btn btn-primary">Upload Artwork</Link>
        </div>
      ) : (
        <div className="row">
          {artworks.map((art) => (
            <div className="col-md-4 mb-4" key={art._id}>
              <div className="card h-100 shadow artwork-card">
                <img
                  src={`http://localhost:3002${art.image}`}
                  className="card-img-top"
                  alt={art.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{art.title}</h5>
                  <p className="card-text"><strong>Price:</strong> ${art.price}</p>
                  <p className="card-text text-muted"><small>{art.category}</small></p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link to={`/artwork/${art._id}`} className="btn btn-outline-info btn-sm">View</Link>
                  <Link to={`/edit/${art._id}`} className="btn btn-outline-secondary btn-sm">Edit</Link>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(art._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;

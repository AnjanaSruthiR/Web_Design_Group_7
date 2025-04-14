// src/pages/Wishlist.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Fetch user-specific favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3002/api/users/favorites', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch favorite artworks');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setFavorites(data);
        } else if (Array.isArray(data.favorites)) {
          setFavorites(data.favorites);
        } else {
          console.error("Unexpected favorites format:", data);
          setFavorites([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // ✅ Remove from favorites
  const removeFavorite = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3002/api/users/favorites/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updated = await fetch('http://localhost:3002/api/users/favorites', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const updatedFavorites = await updated.json();
        setFavorites(updatedFavorites);
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <div className="wishlist-page container text-center my-5">
        <p>Loading favorites...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wishlist-page container text-center my-5">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="wishlist-page container text-center my-5">
        <h1>No favorites yet!</h1>
        <p>Go add some artworks to your wishlist.</p>
        <Link to="/marketplace" className="btn btn-primary">Browse Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page container my-5">
      <h1 className="mb-4">My Wishlist</h1>
      <div className="row">
        {favorites.map((art) => (
          <div key={art._id || art.id} className="col-md-4 mb-4">
            <div className="card wishlist-card h-100 shadow">
              <Link to={`/artwork/${art._id || art.id}`} className="text-decoration-none text-dark">
                <img
                  src={`http://localhost:3002${art.image}`}
                  className="card-img-top"
                  alt={art.title}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{art.title}</h5>
                  <p className="card-text">{art.artist}</p>
                  <p className="card-text"><strong>Price:</strong> ${art.price}</p>
                </div>
              </Link>
              <div className="card-footer text-center">
                <button className="btn btn-danger btn-sm" onClick={() => removeFavorite(art._id || art.id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

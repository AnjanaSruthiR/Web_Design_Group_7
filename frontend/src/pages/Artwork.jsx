import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Artwork.css';
 
const Artwork = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);
 
  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/artworks/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch artwork details');
        }
        const data = await response.json();
        setArtwork(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching artwork:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchArtwork();
  }, [id]);
 
// Toggle favorite on click (excerpt)
const toggleFavorite = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/artworks/${artwork._id}/favorite`, {
        method: 'PATCH'
      });
      if (response.ok) {
        const updatedArtwork = await response.json();
        setArtwork(updatedArtwork.artwork);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };  
 
  const toggleDescription = () => {
    setShowFullDescription(prevState => !prevState);
  };
 
  if (loading) {
    return (
      <div className="container text-center my-5">
        <p>Loading artwork details...</p>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="container text-center my-5">
        <p>Error: {error}</p>
      </div>
    );
  }
 
  if (!artwork) {
    return (
      <div className="container text-center my-5">
        <p>Artwork not found.</p>
      </div>
    );
  }
 
  // Limit description length for the overview tab
  const descriptionPreview = artwork.description.length > 200
    ? artwork.description.substring(0, 200) + '...'
    : artwork.description;
 
  return (
    <div className="artwork-details-page">
      <div className="container my-5">
        <Link to="/marketplace" className="btn btn-outline-info mb-4 back-btn">
          &larr; Back to Marketplace
        </Link>
        <div className="artwork-details-container">
          <div className="artwork-header">
            <h2 className="artwork-title">{artwork.title}</h2>
            <button className={`like-btn ${artwork.fav ? 'liked' : ''}`} onClick={toggleFavorite}>
  {artwork.fav ? '♥ Liked' : '♡ Like'}
</button>
          </div>
          <div className="row">
            <div className="col-md-6 artwork-image-wrapper">
              <img
                src={`http://localhost:3002${artwork.image}`}
                alt={artwork.title}
                className="img-fluid artwork-detail-img"
              />
            </div>
            <div className="col-md-6 artwork-info">
              <div className="tabs">
                <button
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specs')}
                >
                  Specifications
                </button>
              </div>
              {activeTab === 'overview' && (
                <div className="tab-content">
                  <p className="artwork-artist"><strong>Artist:</strong> {artwork.artist}</p>
                  <p className="artwork-category"><strong>Category:</strong> {artwork.category}</p>
                  <p className="artwork-price"><strong>Price:</strong> ${artwork.price}</p>
                  <p className="artwork-rating"><strong>Rating:</strong> {artwork.rating} / 5</p>
                  <div className="artwork-description-wrapper">
                    <p className="artwork-description">
                      <strong>Description:</strong> {showFullDescription ? artwork.description : descriptionPreview}
                    </p>
                    {artwork.description.length > 200 && (
                      <button className="read-more-btn" onClick={toggleDescription}>
                        {showFullDescription ? 'Show Less' : 'Read More'}
                      </button>
                    )}
                  </div>
                </div>
              )}
              {activeTab === 'specs' && (
                <div className="tab-content">
                  {artwork.dimensions && (
                    <p className="artwork-dimensions"><strong>Dimensions:</strong> {artwork.dimensions}</p>
                  )}
                  {artwork.medium && (
                    <p className="artwork-medium"><strong>Medium:</strong> {artwork.medium}</p>
                  )}
                  {artwork.yearCreated && (
                    <p className="artwork-year"><strong>Year Created:</strong> {artwork.yearCreated}</p>
                  )}
                  {artwork.discount > 0 && (
                    <p className="artwork-discount"><strong>Discount:</strong> {artwork.discount}%</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Artwork;
 
 
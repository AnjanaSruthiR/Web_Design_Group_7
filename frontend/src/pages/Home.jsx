// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // Check if the user is logged in by seeing if a token is stored
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            {/* Left: Text & Calls-to-Action */}
            <div className="col-md-6">
              <h1>Discover Unique Artworks</h1>
              <p>
                Welcome to PaletteSquare – your interactive art marketplace. Explore innovative artworks and connect with creative talents from around the world.
              </p>
              <div className="hero-buttons">
                {/* Conditionally show "Join Now" only if NOT logged in */}
                {!isLoggedIn && (
                  <Link className="btn btn-primary me-2" to="/register">
                    Join Now
                  </Link>
                )}
                <Link className="btn btn-outline-secondary" to="/marketplace">
                  Browse Artworks
                </Link>
              </div>
            </div>
            {/* Right: Hero Image */}
            <div className="col-md-6">
              <img
                src="/assets/Home.png"
                alt="Featured Artwork"
                className="img-fluid hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="featured-section my-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Artworks</h2>
          <div className="row">
            {/* Artwork Item */}
            <div className="col-md-4 mb-4">
              <div className="card artwork-card">
                <img src="/assets/Arts/DigitalArt6.jpg" alt="Artwork 1" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Crimson Crystal Peaks</h5>
                  <p className="card-text">Aurora Lumen</p>
                </div>
              </div>
            </div>
            {/* Artwork Item */}
            <div className="col-md-4 mb-4">
              <div className="card artwork-card">
                <img src="/assets/Arts/DigitalArt7.jpg" alt="Artwork 2" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Prismatic Forest</h5>
                  <p className="card-text">Evelynn Nighthollow</p>
                </div>
              </div>
            </div>
            {/* Artwork Item */}
            <div className="col-md-4 mb-4">
              <div className="card artwork-card">
                <img src="/assets/Arts/DigitalArt8.jpg" alt="Artwork 3" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">Twilight Vale</h5>
                  <p className="card-text">Mikael Gustafsson</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Highlights Section */}
      <section className="artist-highlights my-5">
        <div className="container">
          <h2 className="text-center mb-4">Artist Highlights</h2>
          <div className="row">
            {/* Repeat for each artist */}
            <div className="col-md-3 mb-4">
              <div className="artist-card text-center">
                <img
                  src="/assets/Artists/PP_1.avif"
                  alt="Artist 1"
                  className="img-fluid rounded-circle artist-img"
                />
                <h5 className="mt-2">Mikael Gustafsson</h5>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="artist-card text-center">
                <img
                  src="/assets/Artists/PP_3.avif"
                  alt="Artist 2"
                  className="img-fluid rounded-circle artist-img"
                />
                <h5 className="mt-2">Rowan Stormfeather</h5>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="artist-card text-center">
                <img
                  src="/assets/Artists/PP_2.avif"
                  alt="Artist 3"
                  className="img-fluid rounded-circle artist-img"
                />
                <h5 className="mt-2">Evelynn Nighthollow</h5>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="artist-card text-center">
                <img
                  src="/assets/Artists/PP_4.avif"
                  alt="Artist 4"
                  className="img-fluid rounded-circle artist-img"
                />
                <h5 className="mt-2">Aurora Lumen</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

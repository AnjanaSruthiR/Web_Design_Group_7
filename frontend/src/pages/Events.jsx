// src/pages/Events.jsx
import React, { useState } from 'react';
import './Events.css';

const sampleEvents = [
  {
    id: 1,
    title: 'Art & Wine Evening',
    location: 'New York',
    date: '2025-05-15',
    description: 'Enjoy a curated evening of art exhibitions paired with fine wines.',
    image: '/assets/events/E1.jpg',
  },
  {
    id: 2,
    title: 'Street Art Festival',
    location: 'Los Angeles',
    date: '2025-06-10',
    description: 'A vibrant celebration of street art featuring live murals and workshops.',
    image: '/assets/events/E2.webp',
  },
  {
    id: 3,
    title: 'Modern Art Conference',
    location: 'San Francisco',
    date: '2025-07-20',
    description: 'A conference discussing the latest trends in modern art, with keynote speakers and exhibitions.',
    image: '/assets/events/E3.jpeg',
  },
  {
    id: 4,
    title: 'Gallery Night',
    location: 'Chicago',
    date: '2025-08-05',
    description: 'Experience a night at the gallery with exclusive previews of upcoming artists.',
    image: '/assets/events/E4.jpeg',
  },
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filter events by location (case-insensitive)
  const filteredEvents = sampleEvents.filter((event) =>
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort events by date
  const sortedEvents = filteredEvents.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // For demo, assume first 2 events are top events if available.
  const topEvents = sortedEvents.slice(0, 2);
  const upcomingEvents = sortedEvents.slice(2);

  return (
    <div className="events-page">
      <div className="container my-5">
        <h1 className="text-center mb-4">Upcoming Art Events</h1>
        
        {/* Filters and Sorting */}
        <div className="row mb-4">
          <div className="col-md-4 offset-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search events by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Sort by Date: Oldest First</option>
              <option value="desc">Sort by Date: Newest First</option>
            </select>
          </div>
        </div>

        {/* Top Events Section */}
        {topEvents.length > 0 && (
          <section className="top-events-section mb-5">
            <h2 className="text-center mb-4">Top Events This Month</h2>
            <div className="row">
              {topEvents.map((event) => (
                <div key={event.id} className="col-md-6 mb-4">
                  <div className="card event-card h-100 shadow">
                    <img src={event.image} className="card-img-top" alt={event.title} />
                    <div className="card-body">
                      <h5 className="card-title">{event.title}</h5>
                      <p className="card-text">
                        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p className="card-text">{event.description}</p>
                    </div>
                    <div className="card-footer text-center">
                      <button className="btn btn-outline-primary">Learn More</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Events Section */}
        <section className="upcoming-events-section">
          <h2 className="text-center mb-4">More Upcoming Events</h2>
          <div className="row">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card event-card h-100 shadow">
                    <img src={event.image} className="card-img-top" alt={event.title} />
                    <div className="card-body">
                      <h5 className="card-title">{event.title}</h5>
                      <p className="card-text">
                        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p className="card-text">{event.description}</p>
                    </div>
                    <div className="card-footer text-center">
                      <button className="btn btn-outline-primary">Learn More</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-center">No events found for the selected location.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;

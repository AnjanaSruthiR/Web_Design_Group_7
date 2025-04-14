import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch events from the backend when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Sorting function (by date)
  const sortEvents = (a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  };

  // Top Events: Filter those marked as top events
  const topEvents = events.filter(event => event.isTopEvent);

  // Upcoming Events: Include ALL events for the list (filter, sort, etc. apply to all events)
  const upcomingEventsAll = events;

  // Apply search filter (by location) and then sort, to upcoming events
  const filteredUpcomingEvents = upcomingEventsAll.filter((event) =>
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedUpcomingEvents = [...filteredUpcomingEvents].sort(sortEvents);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <p>Loading events...</p>
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

  return (
    <div className="events-page">
      <div className="container my-5">

        {/* Top Events Carousel Section */}
        {topEvents.length > 0 && (
          <section className="top-events-section mb-5">
            <h2 className="text-center mb-4">Top Events This Month</h2>
            <Carousel>
              {topEvents.map((event) => (
                <Carousel.Item key={event._id}>
                  {event.image && (
                    <img
                      className="d-block w-100 carousel-img"
                      // Prepend the backend URL to the image path
                      src={`http://localhost:3002${event.image}`}
                      alt={event.title}
                    />
                  )}
                  <Carousel.Caption>
                    <h3>{event.title}</h3>
                    <p>
                      <strong>Date:</strong> {new Date(event.date).toLocaleDateString()} | <strong>Location:</strong> {event.location}
                    </p>
                    <p>{event.description}</p>
                    <button className="btn btn-outline-primary">Learn More</button>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </section>
        )}

        {/* Filters and Sorting for Upcoming Events */}
        <section className="upcoming-events-section">
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
                <option value="asc">Sort by: Nearest First</option>
                <option value="desc">Sort by: Farthest First</option>
              </select>
            </div>
          </div>
          <h2 className="text-center mb-4">More Upcoming Events</h2>
          <div className="list-group">
            {sortedUpcomingEvents.length > 0 ? (
              sortedUpcomingEvents.map((event) => (
                <div
                  key={event._id}
                  className="list-group-item list-group-item-action flex-column align-items-start"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{event.title}</h5>
                    <small>{new Date(event.date).toLocaleDateString()}</small>
                  </div>
                  <p className="mb-1"><strong>Location:</strong> {event.location}</p>
                  <p className="mb-1">{event.description}</p>
                  <button className="btn btn-outline-primary btn-sm">Learn More</button>
                </div>
              ))
            ) : (
              <p className="text-center">No events found for the selected location.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;

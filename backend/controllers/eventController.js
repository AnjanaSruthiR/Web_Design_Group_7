// server/controllers/eventController.js
const Event = require('../models/Event');

// Create a new event
const createEvent = async (req, res) => {
  try {
    const { title, location, date, description, image } = req.body;
    const newEvent = new Event({ title, location, date, description, image });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event' });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // sorting events by date ascending
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedData = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });
    res.status(200).json({ message: 'Event updated', event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
};

module.exports = { createEvent, getAllEvents, updateEvent, deleteEvent };

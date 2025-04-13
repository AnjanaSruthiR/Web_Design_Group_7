const Event = require('../models/Event');

const createEvent = async (req, res) => {
  try {
    const { title, location, date, description } = req.body;
    // If a file is uploaded, Multer attaches it to req.file
    let imagePath;
    if (req.file) {
      // Save the file path relative to your server (or a complete URL if hosting elsewhere)
      imagePath = '/uploads/' + req.file.filename;
    }
    const newEvent = new Event({
      title,
      location,
      date,
      description,
      image: imagePath, // this field is optional if no image is uploaded
    });
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

// server/routes/event.js
const express = require('express');
const router = express.Router();
const { createEvent, getAllEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const upload = require('../upload'); // if you have file upload configuration

// Create new event with file upload support
router.post('/', upload.single('image'), createEvent);

// Get all events
router.get('/', getAllEvents);

// Update an event by id
router.put('/:id', updateEvent);

// Delete an event by id
router.delete('/:id', deleteEvent);

module.exports = router;

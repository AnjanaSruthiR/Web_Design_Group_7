// server/routes/artworks.js
const express = require('express');
const router = express.Router();
const {
  createArtwork,
  getAllArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork
} = require('../controllers/artworkController');
const upload = require('../upload'); // Assuming you configured multer in upload.js

// Create a new artwork (with file upload for 'img')
router.post('/', upload.single('img'), createArtwork);

// Get all artworks
router.get('/', getAllArtworks);

// Get a single artwork by ID
router.get('/:id', getArtworkById);

// Update an artwork by ID
router.put('/:id', updateArtwork);

// Delete an artwork by ID
router.delete('/:id', deleteArtwork);

module.exports = router;

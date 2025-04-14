const Artwork = require('../models/Artwork');
const createArtwork = async (req, res) => {
    try {
      let imagePath = '';
      if (req.file) {
        imagePath = '/uploads/' + req.file.filename;
      } else {
        // If not using file upload, check if an image URL is provided in the body
        imagePath = req.body.image;
      }
      
      // Validate required fields manually if needed
      if (!req.body.description) {
        return res.status(400).json({ message: 'Description is required' });
      }
      if (!imagePath) {
        return res.status(400).json({ message: 'Image is required' });
      }
      
      const { title, category, description, artist, price, stock, rating, dimensions, medium, yearCreated, inStock, discount } = req.body;
  
      const newArtwork = new Artwork({
        title,
        category,
        description,
        artist,
        price,
        stock,
        rating,
        image: imagePath,
        dimensions,
        medium,
        yearCreated,
        inStock,
        discount
      });
  
      await newArtwork.save();
      res.status(201).json({ message: 'Artwork created successfully', artwork: newArtwork });
    } catch (error) {
      console.error('Error creating artwork:', error);
      res.status(500).json({ message: 'Error creating artwork' });
    }
  };  

// Get all artworks
const getAllArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.status(200).json(artworks);
  } catch (error) {
    console.error('Error fetching artworks:', error);
    res.status(500).json({ message: 'Error fetching artworks' });
  }
};

// Get a single artwork by ID
const getArtworkById = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
    res.status(200).json(artwork);
  } catch (error) {
    console.error('Error fetching artwork:', error);
    res.status(500).json({ message: 'Error fetching artwork' });
  }
};



// Delete an artwork by ID
const deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndDelete(req.params.id);
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
    res.status(200).json({ message: 'Artwork deleted successfully' });
  } catch (error) {
    console.error('Error deleting artwork:', error);
    res.status(500).json({ message: 'Error deleting artwork' });
  }
};

module.exports = { createArtwork, getAllArtworks, getArtworkById, deleteArtwork };

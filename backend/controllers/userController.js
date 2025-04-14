const User = require('../models/User');
const Artwork = require('../models/Artwork');

/// POST /api/users/favorites/:artworkId
const toggleFavorite = async (req, res) => {
  const userId = req.user?.id;
  const { artworkId } = req.params;

  if (!userId || !artworkId) {
    return res.status(400).json({ message: 'Missing userId or artworkId' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const index = user.favorites.indexOf(artworkId);
    let isFavorited;

    if (index === -1) {
      user.favorites.push(artworkId);
      isFavorited = true;
    } else {
      user.favorites.splice(index, 1);
      isFavorited = false;
    }

    await user.save();

    return res.status(200).json({ message: 'Favorite status updated', isFavorited });
  } catch (error) {
    console.error('Toggle favorite error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch favorites', error: err });
  }
};

module.exports = { toggleFavorite, getFavorites };

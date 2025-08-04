import Toy from '../models/Toy.js';
import imagekit from '../config/imagekit.js';

export const addToy = async (req, res) => {
  try {
    const { name, price, category, ageGroup, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const uploadedImage = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });

    const newToy = new Toy({
      name,
      price,
      category,
      ageGroup,
      description,
      imageUrl: uploadedImage.url,
    });

    await newToy.save();

    res.status(201).json({ message: 'Toy added successfully', toy: newToy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get all toys
export const getAllToys = async (req, res) => {
  try {
    const toys = await Toy.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(toys);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching toys', error: error.message });
  }
};

export const updateToy = async (req, res) => {
  try {
    const toyId = req.params.id;
    const { name, price, category, ageGroup, description } = req.body;

    let updatedData = { name, price, category, ageGroup, description };

    // If a new image is provided
    if (req.file) {
      const uploadedImage = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
      });
      updatedData.imageUrl = uploadedImage.url;
    }

    const updatedToy = await Toy.findByIdAndUpdate(toyId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedToy) {
      return res.status(404).json({ message: 'Toy not found' });
    }

    res.status(200).json({ message: 'Toy updated successfully', toy: updatedToy });
  } catch (error) {
    console.error('Update Error:', error.message);
    res.status(500).json({ message: 'Server error while updating toy' });
  }
};

export const deleteToy = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedToy = await Toy.findByIdAndDelete(id);

    if (!deletedToy) {
      return res.status(404).json({ message: 'Toy not found' });
    }

    res.status(200).json({ message: 'Toy deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error.message);
    res.status(500).json({ message: 'Failed to delete toy' });
  }
};

// Get Toy by ID
export const getToyById = async (req, res) => {
  try {
    const toy = await Toy.findById(req.params.id);

    if (!toy) {
      return res.status(404).json({ message: "Toy not found" });
    }

    res.status(200).json(toy);
  } catch (error) {
    res.status(500).json({ message: "Error fetching toy", error: error.message });
  }
};


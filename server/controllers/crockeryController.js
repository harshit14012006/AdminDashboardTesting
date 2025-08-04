import Crockery from '../models/Crockery.js';
import imagekit from '../config/imagekit.js';

export const addCrockery = async (req, res) => {
  try {
    const { name, price, category, material, description } = req.body;

    const file = req.file;
    if (!file) return res.status(400).json({ message: 'Image is required' });

    const uploadedImage = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    const newCrockery = new Crockery({
      name,
      price,
      category,
      material,
      description,
      imageUrl: uploadedImage.url,
    });

    await newCrockery.save();
    res.status(201).json({ message: 'Crockery added successfully', crockery: newCrockery });
  } catch (error) {
    res.status(500).json({ message: 'Error adding crockery', error: error.message });
  }
};

export const getAllCrockery = async (req, res) => {
  try {
    const crockeryItems = await Crockery.find();
    res.status(200).json(crockeryItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching crockery', error: error.message });
  }
};

export const getCrockeryById = async (req, res) => {
  try {
    const crockery = await Crockery.findById(req.params.id);
    if (!crockery) return res.status(404).json({ message: 'Crockery not found' });

    res.status(200).json(crockery);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching crockery', error: error.message });
  }
};

export const updateCrockery = async (req, res) => {
  try {
    const { name, price, category, material, description } = req.body;
    const file = req.file;

    let imageUrl;

    if (file) {
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,
      });
      imageUrl = uploadedImage.url;
    }

    const updated = await Crockery.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        category,
        material,
        description,
        ...(imageUrl && { imageUrl }),
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Crockery not found' });

    res.status(200).json({ message: 'Crockery updated successfully', crockery: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating crockery', error: error.message });
  }
};

export const deleteCrockery = async (req, res) => {
  try {
    const deleted = await Crockery.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Crockery not found' });

    res.status(200).json({ message: 'Crockery deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting crockery', error: error.message });
  }
};

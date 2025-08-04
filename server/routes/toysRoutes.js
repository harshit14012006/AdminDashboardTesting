import express from 'express';
import upload from '../middleware/upload.js';
import { getAllToys, addToy, getToyById, updateToy, deleteToy  } from '../controllers/toysController.js';

const router = express.Router();

router.get('/get-all-toys', getAllToys);
router.post('/add-toy', upload.single('image'), addToy);
router.get('/:id', getToyById);
router.put('/:id', upload.single('image'), updateToy);
router.delete('/:id', deleteToy);

export default router;

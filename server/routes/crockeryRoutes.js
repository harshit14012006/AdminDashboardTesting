import express from 'express';
import multer from 'multer';
import {
  addCrockery,
  getAllCrockery,
  getCrockeryById,
  updateCrockery,
  deleteCrockery,
} from '../controllers/crockeryController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/add-crockery', upload.single('images'), addCrockery);
router.get('/get-all-crockery', getAllCrockery);
router.get('/:id', getCrockeryById);
router.put('/update-crockery/:id', upload.single('images'), updateCrockery);
router.delete('/delete-crockery/:id', deleteCrockery);

export default router;

import express from 'express';
import { loginAdmin, updateAdminCredentials } from '../controllers/adminController.js';
import authenticateAdmin from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/admin/login
router.post('/login', loginAdmin);
router.put('/update', authenticateAdmin, updateAdminCredentials);

export default router;

import express from 'express';
import { registerUser, loginUser, getUserProfile, updateProfile } from '../controller/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Profile routes
router.get('/get-profile', authUser, getUserProfile);
router.post('/update-profile', authUser, upload.single('image'), updateProfile);
// router.get('/list', doctorList); // ✅ open GET /api/doctor/list


export default router;

// routes/appointmentRoute.js
import express from 'express';
import {
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  payAppointment,
} from '../controller/appointmentController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

router.post('/book', authUser, bookAppointment);  // ✅ only once
router.get('/user', authUser, getUserAppointments);
router.delete('/cancel/:id', authUser, cancelAppointment);
router.put('/pay/:id', authUser, payAppointment);

export default router;

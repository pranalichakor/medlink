import express from 'express';
import { createStripePayment } from '../controller/paymentController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/create-payment', isAuthenticated, createStripePayment);

export default router;

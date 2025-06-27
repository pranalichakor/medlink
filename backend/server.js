import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import { connectCloudinary } from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import appointmentRoutes from './routes/appointmentRoute.js';
import paymentRoutes from './routes/paymentRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// DB & Cloudinary
connectDB();
connectCloudinary();

// Middleware
// Middleware
app.use(cors({
  origin: 'https://medlink1.netlify.app',
  credentials: true,
}));
app.use(express.json());
app.use(express.json());

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/payment', paymentRoutes);

// Root Route
app.get('/', (req, res) => res.send('API WORKING'));

// Server
app.listen(port, () => console.log(`🚀 Server started on port ${port}`));

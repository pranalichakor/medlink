import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  doc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
    required: true
  },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Number, required: true },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  paymentStatus: {
    type: String,
    enum: ['not paid', 'paid'],
    default: 'not paid',
  },
});

export default mongoose.model("appointment", appointmentSchema);

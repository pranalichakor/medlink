import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  speciality: { type: String },
  degree: { type: String },
  experience: { type: String },
  about: { type: String },
  fees: { type: Number },
  address: {
  line1: { type: String },
  line2: { type: String }
},

  available: { type: Boolean, default: false }, // ✅ this is important
  slots_booked: { type: Object, default: {} },  // ✅ required for booking
});

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
export default doctorModel;

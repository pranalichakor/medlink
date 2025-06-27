import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ✅ PUBLIC - Get all available doctors
const publicDoctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ available: true }).select("-password -email");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log("Public doctor list error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ PUBLIC - Doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      token,
      doctor: {
        name: doctor.name,
        image: doctor.image,
        _id: doctor._id,
      },
    });
  } catch (error) {
    console.log("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// PROTECTED: Get logged-in doctor's appointments
const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const appointments = await appointmentModel
      .find({ doc: doctorId })
      .populate("user", "name email");
    res.json({ success: true, appointments });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PROTECTED: Mark appointment complete
const completeAppointment = async (req, res) => {
  try {
    const appt = await appointmentModel.findById(req.params.id);
    if (!appt) return res.status(404).json({ success: false, message: "Not found" });
    appt.isCompleted = true;
    await appt.save();
    res.json({ success: true, appointment: appt });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PROTECTED: Get doctor profile
const getDoctorProfile = async (req, res) => {
  const doctor = await doctorModel.findById(req.user.id).select("-password");
  res.json({ success: true, doctor });
};

// PROTECTED: Update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    await doctorModel.findByIdAndUpdate(req.user.id, req.body);
    res.json({ success: true, message: "Profile updated" });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// ❗️ Admin-only handlers (if implemented later)
const doctorList = async (req, res) => {
  // e.g., list all doctors (admin only)
};
const changeAvailability = async (req, res) => {
  // toggle available/unavailable
};
const toggleDoctorAvailability = async (req, res) => {
  // switch availability status
};

// ✅ Export All Controllers
export {
  publicDoctorList,
  loginDoctor,
  getDoctorAppointments,
  getDoctorProfile,
  updateDoctorProfile,
  doctorList,
  changeAvailability,
  toggleDoctorAvailability,
  completeAppointment ,
};

import doctorModel from "../models/doctorModel.js";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js"; // ✅ ensure this is imported


// ✅ Add Doctor Controller
const addDoctor = async (req, res) => {
  try {
    const {
      name, email, password, speciality, degree,
      experience, about, fees, address
    } = req.body;

    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Doctor already exists with this email." });
    }

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder: "doctors" },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(buffer);
      });
    };

    const uploadedImage = await streamUpload(imageFile.buffer);
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      image: uploadedImage.secure_url,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    });

    await doctor.save();
    res.status(201).json({ success: true, message: "Doctor registered successfully", doctor });

  } catch (error) {
    console.error("❌ Error in addDoctor:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get All Doctors
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password');
    res.json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get All Appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .populate("user", "name")
      .populate("doc", "name");

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching all appointments:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Cancel Appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    await appointmentModel.findByIdAndDelete(appointmentId);

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("❌ Cancel appointment error:", error);
    res.status(500).json({ success: false, message: "Failed to cancel appointment" });
  }
};

// ✅ Toggle Doctor Availability
const toggleAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const doctor = await doctorModel.findById(docId);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    doctor.available = !doctor.available;
    await doctor.save();

    res.json({ success: true, message: `Doctor is now ${doctor.available ? "available" : "unavailable"}` });
  } catch (error) {
    console.error("Toggle Availability Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Admin Dashboard Data
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel
      .find({})
      .populate("user", "name")
      .populate("doc", "name");

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 👇 add this to the export block
export {
  addDoctor,
  loginAdmin,
  allDoctors,
  getAllAppointments,
  cancelAppointment,
  toggleAvailability,
  adminDashboard, // ✅ added here
};





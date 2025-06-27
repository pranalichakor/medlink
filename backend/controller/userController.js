import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// =========================
// Register User Controller
// =========================
// controller/userController.js


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "All fields required" });

    const userExists = await userModel.findOne({ email });
    if (userExists)
      return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ success: true, message: "User created", token, user });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};


// =======================
// Login User Controller
// =======================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Missing email or password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,         // ✅ Added _id
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// =======================
// Get User Profile
// =======================
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId).select('-password');

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User profile fetched successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// =======================
// Update User Profile
// =======================
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    const userId = req.userId;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    const parsedAddr = typeof address === "string" ? JSON.parse(address) : address;
    const updateData = { name, phone, dob, gender, address: parsedAddr };

    if (imageFile) {
      const streamUpload = buffer => new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (err, result) => err ? reject(err) : resolve(result)
        );
        streamifier.createReadStream(buffer).pipe(upload);
      });

      const uploaded = await streamUpload(imageFile.buffer);
      updateData.image = uploaded.secure_url;
    }

    const updated = await userModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
    return res.json({ success: true, message: "Profile updated", user: updated });

  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

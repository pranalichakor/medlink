import express from "express";
import authAdmin from "../middlewares/authAdmin.js";
import {
  loginAdmin,
  addDoctor,
  toggleAvailability,
  allDoctors,
  getAllAppointments,
  cancelAppointment,
  adminDashboard, // ✅ new
} from "../controller/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/add-doctor", authAdmin, addDoctor);
router.post("/all-doctors", authAdmin, allDoctors);
router.get("/appointments", getAllAppointments);
router.post("/cancel-appointment", authAdmin, cancelAppointment);
router.post("/change-availability", authAdmin, toggleAvailability);

// ✅ NEW Dashboard API
router.get("/dashboard", authAdmin, adminDashboard);

export default router;

import express from "express";
import {
  publicDoctorList,
  loginDoctor,
  toggleDoctorAvailability,
  doctorList,
  changeAvailability,
  getDoctorAppointments,
  getDoctorProfile,
  updateDoctorProfile,
  completeAppointment 
} from "../controller/doctorController.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Public
router.get("/public-doctors", publicDoctorList);
router.post("/login", loginDoctor);

// Doctor Protected
router.get("/appointments", isAuthenticated, getDoctorAppointments);
router.get("/profile", isAuthenticated, getDoctorProfile);
router.put("/profile", isAuthenticated, updateDoctorProfile);

router.post("/change-availability", toggleDoctorAvailability);
router.get("/list", publicDoctorList);
router.post("/set-availability", changeAvailability);
router.put("/appointments/:id/complete", isAuthenticated, completeAppointment);


export default router;

import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

// ✅ Book appointment
export const bookAppointment = async (req, res) => {
  try {
    // console.log("🟢 Booking started");
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.userId;
    console.log({ docId, slotDate, slotTime, userId });

    if (!userId || !docId || !slotDate || !slotTime) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const docData = await doctorModel.findById(docId).select("-password");
    const userData = await userModel.findById(userId).select("-password");
    // console.log("✅ Got doctor and user data");

    if (!docData || !userData) {
      return res.status(404).json({ success: false, message: "Doctor or User not found" });
    }

    let slots_booked = docData.slots_booked || {};
    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res.json({ success: false, message: "Slot already booked" });
    }
    slots_booked[slotDate] = [...(slots_booked[slotDate] || []), slotTime];

    const newAppointment = new appointmentModel({
      user: userId,
      doc: docId,
      slotDate,
      slotTime,
      amount: docData.fees || 0,
      date: Date.now(),
      paymentStatus: "not paid",
    });

    await newAppointment.save();
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("❌ Book Appointment Error:", error);
    res.status(500).json({ success: false, message: "Server error while booking appointment" });
  }
};

// ✅ Get all appointments of the logged-in user
export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const appointments = await appointmentModel
      .find({ user: userId })
      .populate("doc")
      .sort({ date: -1 });

    res.status(200).json({ success: true, message: "Appointments fetched successfully", appointments });
  } catch (error) {
    console.error("Error fetching user appointments:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const userId = req.userId;

    const appointment = await appointmentModel.findOne({ _id: appointmentId, user: userId });
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    const doctor = await doctorModel.findById(appointment.doc);
    if (doctor && doctor.slots_booked?.[appointment.slotDate]) {
      doctor.slots_booked[appointment.slotDate] = doctor.slots_booked[appointment.slotDate].filter(
        time => time !== appointment.slotTime
      );
      await doctor.save();
    }

    await appointmentModel.deleteOne({ _id: appointmentId });
    res.status(200).json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.error("Cancel Appointment Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Mark payment as completed
export const payAppointment = async (req, res) => {
  try {
    const appointment = await appointmentModel.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "paid" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.json({ success: true, message: "Payment successful", appointment });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ success: false, message: "Payment failed" });
  }
};

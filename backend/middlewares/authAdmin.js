import jwt from "jsonwebtoken";

// admin auth middleware
const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized. Login again." });
    }

    const token = authHeader.split(" ")[1]; // Get the token after "Bearer"

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token contains valid admin email and role
    if (decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Invalid admin credentials." });
    }

    // Optional: attach decoded info to request if needed
    req.admin = decoded;

    next(); // Auth successful
  } catch (error) {
    console.log("authAdmin error:", error);
    res.status(401).json({ success: false, message: "Not authorized. Login again." });
  }
};

export default authAdmin;

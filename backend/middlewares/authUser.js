import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "User information missing. Please login again." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // ✅ This is what your controller uses
    next();

  } catch (error) {
    console.error("authUser error:", error.message);
    return res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

export default authUser;

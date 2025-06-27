import multer from 'multer';

// Simple in-memory storage (no saving on disk)
const storage = multer.memoryStorage(); 

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: 5MB limit
});
const singleUpload = multer({ storage }).single("image"); // "image" is the field name in Postman

const addDoctor = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    if (!req.file) return res.status(400).json({ message: "Image not received" });

    res.status(200).json({ message: "Doctor added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default upload;

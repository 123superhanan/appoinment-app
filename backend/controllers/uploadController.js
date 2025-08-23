// @desc Upload image to Cloudinary
// @route POST /api/upload
// @access Public
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    res.status(200).json({
      url: req.file.path, // Cloudinary URL
      public_id: req.file.filename,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res
      .status(500)
      .json({ message: "Image upload failed", error: error.message });
  }
};

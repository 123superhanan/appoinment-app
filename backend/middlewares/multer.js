import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; // your cloudinary config

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "doctors",
    format: async () => "png",
    public_id: (req, file) =>
      `doctor-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed!"), false);
  },
});

export { upload }; // ✅ add this
export const uploadMiddleware = upload.single("image");

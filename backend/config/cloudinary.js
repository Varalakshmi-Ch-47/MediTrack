import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPDF = file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf");
    return {
      folder: "meditrack/medical_records",
      resource_type: isPDF ? "raw" : "image",
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png", "application/pdf"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, PNG, and PDF are allowed."), false);
    }
  }
});

export { cloudinary, upload };

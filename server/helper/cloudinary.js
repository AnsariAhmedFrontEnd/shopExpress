const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "ahmedcloud27",
  api_key: "649962775944721",
  api_secret: "q_8xbrynP194BkBnKqU_cYOl1fc",
});

// Configure storage to accept all image formats
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpeg", "jpg", "png", "gif", "bmp", "tiff", "webp", "svg"], // You can add other formats as needed
  },
});

const upload = multer({ storage });

module.exports = { upload };

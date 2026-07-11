const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "task-attachments",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "pdf",
      "docx",
    ],
  },
});

const taskUpload = multer({
  storage,
});

module.exports = taskUpload;
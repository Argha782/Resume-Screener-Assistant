import multer from "multer";
import path from "node:path";

const storage = multer.memoryStorage();

const allowedTypes = {
  ".pdf": "application/pdf",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
};

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  },

  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const expectedMimeType = allowedTypes[ext];

    if (expectedMimeType && file.mimetype === expectedMimeType) {
      return cb(null, true);
    }

    cb(new Error("Only PDF and DOCX files are allowed."));
  }
});

export default upload;
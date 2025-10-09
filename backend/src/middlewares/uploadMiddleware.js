import multer from "multer";
import path from "path";

// Storage configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "src/uploads/"); // You can also use "src/uploads/resumes/" for resumes
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allow images + PDF + DOC + DOCX
  const allowedTypes = /jpg|jpeg|png|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) cb(null, true);
  else cb(new Error("Only images and document files (PDF/DOC/DOCX) are allowed"));
};

// Max file size: 5MB
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

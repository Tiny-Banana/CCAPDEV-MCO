const multer = require("multer");
const path = require("path");
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/pfp");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  // Multer middleware will handle the file upload

  let filePath;
  try {
    filePath = req.file.path;
    relativePath = path.relative('public', filePath)

    console.log("File uploaded successfully:", req.file);
    res.json({ path: relativePath });
  } catch (error) {
    console.log("No file was uploaded.");
    res.status(400).json({ error: 'No file was uploaded.' });
  }
});

module.exports = router;

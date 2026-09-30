const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, upload.single('file'), (req, res) => {
  console.log('[UPLOAD STARTED] File received:', req.file ? req.file.originalname : 'No file');
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // If req.file.path is a Cloudinary URL (starts with http), return it.
  // Otherwise, it's a local file, return the local URL path.
  let fileUrl = req.file.path;
  if (!fileUrl.startsWith('http')) {
    // Replace backslashes for Windows
    const normalizedPath = req.file.path.replace(/\\/g, '/');
    const filename = normalizedPath.split('/').pop();
    fileUrl = `http://localhost:5000/uploads/${filename}`;
    console.log('[UPLOAD SUCCESS] Saved locally. Generated URL:', fileUrl);
  } else {
    console.log('[UPLOAD SUCCESS] Saved to Cloudinary. URL:', fileUrl);
  }
  
  res.status(200).json({ url: fileUrl });
});

module.exports = router;


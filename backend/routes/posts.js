const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const { createPost, getAllPosts } = require("../controllers/postController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/", auth, upload.single("image"), createPost);
router.get("/", auth, getAllPosts);

module.exports = router;

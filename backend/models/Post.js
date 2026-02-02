const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);

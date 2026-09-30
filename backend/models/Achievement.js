const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);


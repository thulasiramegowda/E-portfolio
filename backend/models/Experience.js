const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  organization: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, default: 'Present' },
  description: { type: String, required: true },
  technologies: { type: [String], default: [] },
  certificateUrl: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);


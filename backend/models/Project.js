const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDesc: { type: String, required: true },
  detailedDesc: { type: String, required: true },
  technologies: { type: [String], default: [] },
  category: { type: String, default: 'Web Development' },
  imageUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  date: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);

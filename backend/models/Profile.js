const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Your Name' },
  headline: { type: String, default: 'Your Headline' },
  shortBio: { type: String, default: 'Short introduction about yourself.' },
  longBio: { type: String, default: 'A detailed biography.' },
  location: { type: String, default: 'City, Country' },
  email: { type: String, default: 'email@example.com' },
  photoUrl: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);

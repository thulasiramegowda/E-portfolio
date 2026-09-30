require('dotenv').config();
const mongoose = require('mongoose');
const readline = require('readline');
const Admin = require('./models/Admin');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function initAdmin() {
  try {
    console.log('\n--- The Journey: Admin Initialization ---\n');
    
    if (!process.env.MONGODB_URI) {
      console.error('ERROR: MONGODB_URI is not set in .env file.');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.\n');

    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      console.error('ERROR: An admin account already exists.');
      console.error('Only one admin account is allowed for security reasons.');
      process.exit(1);
    }

    const email = await askQuestion('Admin Email: ');
    if (!email || !email.includes('@')) {
      console.error('Invalid email.');
      process.exit(1);
    }

    const password = await askQuestion('Admin Password: ');
    if (!password || password.length < 5) {
      console.error('Password too short. Must be at least 5 characters.');
      process.exit(1);
    }

    console.log('\nCreating admin account...');
    
    // The Admin model's pre('save') hook handles bcrypt hashing
    const admin = new Admin({ email, password });
    await admin.save();
    
    console.log('SUCCESS: Admin account created.');
    console.log(`You can now log in at /admin/login using: ${email}`);

  } catch (error) {
    console.error('An error occurred:', error.message);
  } finally {
    rl.close();
    await mongoose.disconnect();
    process.exit(0);
  }
}

initAdmin();

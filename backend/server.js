require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Profile Route
const { getProfile, updateProfile } = require('./controllers/profileController');
const { protect } = require('./middleware/authMiddleware');
app.get('/api/profile', getProfile);
app.put('/api/profile', protect, updateProfile);

// CRUD Routes
const { createCrudRouter } = require('./routes/crudRoutes');
const Journey = require('./models/Journey');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Achievement = require('./models/Achievement');
const Certificate = require('./models/Certificate');

app.use('/api/journey', createCrudRouter(Journey));
app.use('/api/skills', createCrudRouter(Skill));
app.use('/api/projects', createCrudRouter(Project));
app.use('/api/experience', createCrudRouter(Experience));
app.use('/api/education', createCrudRouter(Education));
app.use('/api/achievements', createCrudRouter(Achievement));
app.use('/api/certificates', createCrudRouter(Certificate));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.stack);
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }
  res.status(500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

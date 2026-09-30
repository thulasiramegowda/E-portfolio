import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Home from './pages/Home';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import AdminProfile from './admin/AdminProfile';
import AdminProjects from './admin/AdminProjects';
import AdminJourney from './admin/AdminJourney';
import AdminSkills from './admin/AdminSkills';
import AdminExperience from './admin/AdminExperience';
import AdminEducation from './admin/AdminEducation';
import AdminAchievements from './admin/AdminAchievements';
import AdminCertificates from './admin/AdminCertificates';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="journey" element={<AdminJourney />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="experience" element={<AdminExperience />} />
          <Route path="education" element={<AdminEducation />} />
          <Route path="achievements" element={<AdminAchievements />} />
          <Route path="certificates" element={<AdminCertificates />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


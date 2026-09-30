import { useState, useEffect } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Sections
import Hero from '../sections/Hero';
import About from '../sections/About';
import Journey from '../sections/Journey';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import Achievements from '../sections/Achievements';
import Certificates from '../sections/Certificates';
import Contact from '../sections/Contact';
import CustomCursor from '../components/CustomCursor';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [profile, journey, skills, projects, experience, education, achievements, certificates] = await Promise.all([
          api.get('/profile'),
          api.get('/journey'),
          api.get('/skills'),
          api.get('/projects'),
          api.get('/experience'),
          api.get('/education'),
          api.get('/achievements'),
          api.get('/certificates')
        ]);
        
        setData({
          profile: profile.data,
          journey: journey.data,
          skills: skills.data,
          projects: projects.data,
          experience: experience.data,
          education: education.data,
          achievements: achievements.data,
          certificates: certificates.data
        });
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center text-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-[#ff4747] rounded-full animate-spin"></div>
          <p className="mt-4 text-[#888888] font-serif tracking-widest text-sm uppercase">Loading Journey</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noise bg-[#0f0f11] text-[#fafafa] font-sans selection:bg-[#ff4747] selection:text-white overflow-x-hidden cursor-none">
      <CustomCursor />
      <Navbar profile={data.profile} />
      
      <main>
        <Hero profile={data.profile} />
        <About profile={data.profile} />
        <Journey timeline={data.journey} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Experience experience={data.experience} />
        <Education education={data.education} />
        <Achievements achievements={data.achievements} />
        <Certificates certificates={data.certificates} />
        <Contact profile={data.profile} />
      </main>
      
      <Footer profile={data.profile} />
    </div>
  );
}

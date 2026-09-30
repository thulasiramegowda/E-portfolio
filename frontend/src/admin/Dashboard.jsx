import { useState, useEffect } from 'react';
import api from '../api';
import { FolderGit2, Map, Code, Briefcase, Award } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    journey: 0,
    skills: 0,
    experience: 0,
    certificates: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [proj, journ, skill, exp, cert] = await Promise.all([
          api.get('/projects'),
          api.get('/journey'),
          api.get('/skills'),
          api.get('/experience'),
          api.get('/certificates')
        ]);
        setStats({
          projects: proj.data.length,
          journey: journ.data.length,
          skills: skill.data.length,
          experience: exp.data.length,
          certificates: cert.data.length
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Projects', value: stats.projects, icon: FolderGit2, color: 'text-blue-500' },
    { title: 'Journey Milestones', value: stats.journey, icon: Map, color: 'text-green-500' },
    { title: 'Skills', value: stats.skills, icon: Code, color: 'text-yellow-500' },
    { title: 'Experience', value: stats.experience, icon: Briefcase, color: 'text-purple-500' },
    { title: 'Certificates', value: stats.certificates, icon: Award, color: 'text-pink-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-[#1a1a1c] border border-[#333333] rounded-xl p-6 flex items-center space-x-4">
            <div className={`p-4 bg-[#0f0f11] rounded-lg border border-[#333333] ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[#888888] text-sm font-medium">{stat.title}</p>
              <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

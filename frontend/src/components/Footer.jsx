import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ profile }) {
  return (
    <footer className="py-12 border-t border-[#333333] mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl font-serif">The Journey</h2>
          <p className="text-[#888888] text-sm mt-1">Built with React & Node.js</p>
        </div>
        <div className="flex items-center space-x-6 text-sm text-[#888888]">
          {profile.github && <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>}
          {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>}
          {profile.twitter && <a href={profile.twitter} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</a>}
          <div className="w-px h-4 bg-[#333333]"></div>
          <Link to="/admin/login" className="hover:text-[#ff4747] transition-colors" title="Admin Login">
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}


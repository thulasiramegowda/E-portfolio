import { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  User, 
  Map, 
  Code, 
  FolderGit2, 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Award, 
  LogOut 
} from 'lucide-react';

export default function AdminLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Profile', path: '/admin/profile', icon: User },
    { name: 'About', path: '/admin/profile#about', icon: User },
    { name: 'Journey', path: '/admin/journey', icon: Map },
    { name: 'Skills', path: '/admin/skills', icon: Code },
    { name: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Education', path: '/admin/education', icon: GraduationCap },
    { name: 'Achievements', path: '/admin/achievements', icon: Trophy },
    { name: 'Certificates', path: '/admin/certificates', icon: Award },
    { name: 'Resume', path: '/admin/profile#resume', icon: Briefcase },
    { name: 'Social Links', path: '/admin/profile#social', icon: Code },
    { name: 'Settings', path: '/admin/profile#settings', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f11] text-[#fafafa] flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1c] border-r border-[#333333] hidden md:flex flex-col">
        <div className="p-6 border-b border-[#333333]">
          <h2 className="text-xl font-serif text-white">The Journey CMS</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#ff4747]/10 text-[#ff4747]' 
                    : 'text-[#888888] hover:bg-[#333333] hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-[#333333]">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-[#888888] hover:bg-red-500/10 hover:text-red-500 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-[#333333] bg-[#1a1a1c] flex items-center px-8 md:hidden">
            <h2 className="text-xl font-serif text-white">The Journey CMS</h2>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

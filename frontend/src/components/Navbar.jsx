import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Simple scroll spy
      const sections = ['hero', 'about', 'journey', 'projects', 'experience', 'skills'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'JOURNEY', href: '#journey', id: 'journey' },
    { name: 'PROJECTS', href: '#projects', id: 'projects' },
    { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 font-mono text-xs tracking-widest ${
        scrolled ? 'bg-[#0f0f11]/80 backdrop-blur-md border-b border-[#333333] py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#hero" onClick={(e) => handleScrollTo(e, '#hero')} className="text-sm font-sans font-bold tracking-widest hover:text-[#ff4747] transition-colors">
          THE JOURNEY
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleScrollTo(e, link.href)} 
              className={`relative py-1 transition-colors hover:text-white ${activeSection === link.id ? 'text-white' : 'text-[#888888]'}`}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#ff4747]" />
              )}
            </a>
          ))}
          {profile?.resumeUrl && (
            <a 
              href={profile.resumeUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center space-x-2 text-[#ff4747] border border-[#333333] hover:border-[#ff4747] px-5 py-2 rounded transition-all group"
            >
              <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>RESUME</span>
            </a>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0f0f11] z-50 flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-sm font-sans font-bold tracking-widest">THE JOURNEY</span>
              <button onClick={() => setMobileMenuOpen(false)}><X className="w-6 h-6 text-[#888888]" /></button>
            </div>
            
            <nav className="flex flex-col space-y-8 font-sans text-2xl font-light tracking-wide">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleScrollTo(e, link.href)} 
                  className={`transition-colors ${activeSection === link.id ? 'text-white pl-4 border-l-2 border-[#ff4747]' : 'text-[#888888] hover:text-white'}`}
                >
                  {link.name}
                </a>
              ))}
              {profile?.resumeUrl && (
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-3 text-[#ff4747] mt-8 text-lg font-mono tracking-widest">
                  <Download className="w-5 h-5" />
                  <span>DOWNLOAD RESUME</span>
                </a>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

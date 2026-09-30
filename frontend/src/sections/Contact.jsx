import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Contact({ profile }) {
  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 bg-[#0f0f11] overflow-hidden text-center flex flex-col items-center justify-center min-h-[80vh]">
      
      {/* Section Transition Header */}
      <div className="absolute top-0 left-0 w-full border-t border-[#333333]/50 flex items-center justify-between px-6 py-4 font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase">
        <span>06</span>
        <span>GET IN TOUCH</span>
        <span>COLLABORATE</span>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl mx-auto z-10"
      >
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-serif tracking-tighter leading-[0.9] mb-12 text-white">
          LET'S BUILD <br/>
          <span className="italic text-[#666666] font-light">SOMETHING.</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16">
          <a 
            href={`mailto:${profile.email}`} 
            className="group relative flex items-center justify-center space-x-4 px-10 py-5 bg-white text-black rounded-full overflow-hidden hover:scale-105 transition-transform duration-500 cursor-none"
          >
            <span className="relative z-10 font-mono text-xs tracking-widest font-bold">SEND AN EMAIL</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 bg-[#e6e4e0] transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-out z-0"></div>
          </a>
          
          <div className="flex items-center gap-6">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-[#888888] hover:text-white font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 cursor-none relative group">
                GITHUB
                <span className="absolute -bottom-1 left-0 w-full h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-[#888888] hover:text-white font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 cursor-none relative group">
                LINKEDIN
                <span className="absolute -bottom-1 left-0 w-full h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            )}
            {profile.twitter && (
              <a href={profile.twitter} target="_blank" rel="noreferrer" className="text-[#888888] hover:text-white font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 cursor-none relative group">
                TWITTER
                <span className="absolute -bottom-1 left-0 w-full h-px bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-3xl max-h-3xl bg-[#ff4747]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
    </section>
  );
}
import { motion } from 'framer-motion';

export default function Hero({ profile }) {
  // Floating technical concepts with specific orbital parameters
  const techConcepts = [
    { label: "AI", x: -160, y: -120, delay: 0, hasLine: true },
    { label: "ML", x: 180, y: -160, delay: 0.2, hasLine: false },
    { label: "CLOUD", x: 220, y: 60, delay: 0.4, hasLine: true },
    { label: "SOFTWARE", x: 140, y: 180, delay: 0.6, hasLine: false },
    { label: "DATA", x: -100, y: 220, delay: 0.8, hasLine: true },
    { label: "GEN AI", x: -220, y: 80, delay: 1.0, hasLine: false },
    { label: "VISION", x: -200, y: -60, delay: 1.2, hasLine: true },
    { label: "WEB", x: 180, y: -80, delay: 1.4, hasLine: false },
    { label: "AUTOMATION", x: 60, y: -220, delay: 1.6, hasLine: true }
  ];

  return (
    <section id="hero" className="relative pt-40 pb-20 px-6 min-h-screen flex flex-col justify-center overflow-hidden">
      
      {/* Subtle Technical Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#33333315_1px,transparent_1px),linear-gradient(to_bottom,#33333315_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-noise opacity-30"></div>
        
        {/* Faint crosshairs */}
        <div className="absolute top-[20%] left-[10%] w-4 h-4 border-t border-l border-[#333333]/40"></div>
        <div className="absolute bottom-[20%] right-[10%] w-4 h-4 border-b border-r border-[#333333]/40"></div>
        <div className="absolute top-[20%] right-[10%] w-4 h-4 border-t border-r border-[#333333]/40"></div>
        <div className="absolute bottom-[20%] left-[10%] w-4 h-4 border-b border-l border-[#333333]/40"></div>

        {/* Soft Radial Lighting */}
        <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-[50vw] h-[50vw] bg-[#ff4747]/3 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 left-1/4 w-[40vw] h-[40vw] bg-white/3 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center relative z-10 flex-1">
        
        {/* LEFT SIDE: Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 lg:order-1 lg:col-span-7"
        >
          {/* Top Metadata */}
          <div className="flex items-center space-x-6 mb-10 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#666666]">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4747] animate-pulse"></span>
              <span>01 / THE JOURNEY</span>
            </div>
            <div className="w-px h-3 bg-[#333333]"></div>
            <span>BASED IN {profile.location?.toUpperCase() || 'BENGALURU'}</span>
            <div className="w-px h-3 bg-[#333333] hidden sm:block"></div>
            <span className="hidden sm:block">BUILDING WITH AI</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-sans font-semibold tracking-tighter leading-[0.9] mb-8">
            <span className="block mb-2 text-white/95">I'M {profile.name?.split(' ')[0]?.toUpperCase() || 'THULASI'}</span>
            <span className="block font-serif italic text-[#888888] font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl">THE JOURNEY</span>
          </h1>
          
          <div className="relative pl-6 border-l-2 border-[#ff4747]/50 mb-12">
            <p className="text-[#a0a0a0] max-w-lg text-lg sm:text-xl font-light leading-relaxed">
              {profile.shortBio || "CSIT student building through AI, software, experimentation and real-world ideas."}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-widest">
            <a href="#projects" className="group relative bg-[#fafafa] text-[#0f0f11] px-8 py-4 overflow-hidden rounded-sm hover:scale-[1.02] transition-transform duration-300 flex items-center space-x-3">
              <span className="relative z-10 font-semibold">VIEW PROJECTS</span>
              <span className="relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0"></div>
            </a>
            
            <a href="#journey" className="group border border-[#333333] text-[#a0a0a0] hover:text-white hover:border-[#555555] px-8 py-4 rounded-sm transition-all duration-300 flex items-center space-x-3 bg-[#0f0f11]/50 backdrop-blur-sm">
              <span>EXPLORE THE JOURNEY</span>
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#ff4747]">↓</span>
            </a>
          </div>
        </motion.div>
        
        {/* RIGHT SIDE: Photo & Orbit */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.5, delay: 0.3 }} 
          className="order-1 lg:order-2 lg:col-span-5 flex justify-center items-center relative min-h-[450px] lg:min-h-[600px] w-full"
        >
          {/* Central Portrait */}
          <motion.div 
            className="relative z-20 group cursor-none"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="w-[260px] h-[340px] sm:w-[320px] sm:h-[420px] rounded-tl-[40px] rounded-br-[40px] rounded-tr-[100px] rounded-bl-[10px] overflow-hidden border border-[#444444] bg-[#1a1a1c] relative z-20 shadow-2xl">
              {profile.photoUrl ? (
                <img 
                  src={profile.photoUrl} 
                  alt={profile.name} 
                  className="w-full h-full object-cover filter contrast-[1.15] saturate-[0.85] group-hover:saturate-100 transition-all duration-700" 
                  onError={(e) => { e.target.onerror = null; e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="%23333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>'; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#333333] font-serif">Photo Not Found</div>
              )}
              {/* Image Grain Overlay */}
              <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay pointer-events-none"></div>
              {/* Soft Inner Shadow */}
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] pointer-events-none"></div>
            </div>
            
            {/* Offset Frame Decoration */}
            <div className="absolute -inset-4 border border-[#333333]/60 rounded-tl-[48px] rounded-br-[48px] rounded-tr-[110px] rounded-bl-[16px] pointer-events-none z-10 transform translate-x-3 translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-700"></div>
            
            {/* Very faint background frame */}
            <div className="absolute -inset-8 border border-[#ff4747]/10 rounded-tl-[56px] rounded-br-[56px] rounded-tr-[120px] rounded-bl-[24px] pointer-events-none z-0 transform -translate-x-2 -translate-y-2 group-hover:scale-105 transition-transform duration-1000 hidden sm:block"></div>
          </motion.div>

          {/* Interactive Technology Orbit */}
          <div className="absolute inset-0 z-30 pointer-events-none hidden sm:block">
            {techConcepts.map((tech, idx) => (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: [tech.x, tech.x + Math.sin(idx) * 8, tech.x],
                  y: [tech.y, tech.y + Math.cos(idx) * 8, tech.y]
                }}
                transition={{
                  opacity: { duration: 1, delay: 0.5 + tech.delay },
                  scale: { duration: 1, delay: 0.5 + tech.delay, type: "spring", stiffness: 100 },
                  x: { duration: 8 + (idx % 3), repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 9 + (idx % 4), repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group"
                style={{ marginLeft: tech.x, marginTop: tech.y }}
              >
                {/* Thin Connecting Line to Center */}
                {tech.hasLine && (
                  <svg className="absolute top-1/2 left-1/2 -z-10 pointer-events-none overflow-visible w-0 h-0">
                    <motion.line 
                      x1="0" y1="0" 
                      x2={-tech.x * 0.7} y2={-tech.y * 0.7} 
                      stroke="#ff4747" 
                      strokeWidth="0.5" 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.15 }}
                      whileHover={{ opacity: 0.5, strokeWidth: 1 }}
                    />
                  </svg>
                )}

                <div className="pointer-events-auto cursor-none bg-[#0f0f11]/90 backdrop-blur-md border border-[#222222] text-[#888888] font-mono text-[9px] sm:text-[10px] tracking-widest px-3 py-1.5 rounded-sm shadow-2xl hover:border-[#ff4747]/70 hover:text-white hover:scale-110 hover:shadow-[#ff4747]/10 transition-all duration-300 flex items-center space-x-2">
                  <span className={`w-1 h-1 rounded-full ${tech.hasLine ? 'bg-[#ff4747]' : 'bg-[#555555]'} opacity-70 group-hover:opacity-100 transition-opacity`}></span>
                  <span>{tech.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-6 sm:left-1/2 sm:-translate-x-1/2 flex flex-col items-center space-y-4"
      >
        <div className="font-mono text-[9px] tracking-[0.3em] text-[#666666] uppercase rotate-90 sm:rotate-0 sm:writing-horizontal origin-left translate-x-4 sm:translate-x-0 mb-8 sm:mb-0">
          SCROLL TO EXPLORE
        </div>
        <div className="w-px h-16 bg-[#222222] relative overflow-hidden hidden sm:block">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-[#ff4747]"
            animate={{ top: ['-50%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
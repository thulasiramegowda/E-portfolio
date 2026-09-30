import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Journey({ timeline }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!timeline || timeline.length === 0) return null;

  return (
    <section id="journey" ref={containerRef} className="relative py-32 md:py-48 px-6 bg-[#0f0f11] overflow-hidden">
      
      {/* Section Transition Header */}
      <div className="absolute top-0 left-0 w-full border-t border-[#333333]/50 flex items-center justify-between px-6 py-4 font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase">
        <span>03</span>
        <span>THE TIMELINE</span>
        <span>EXPERIENCE</span>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[linear-gradient(to_bottom,transparent,#33333320_20%,#33333320_80%,transparent)] ml-[5%]"></div>
      <div className="absolute right-0 top-0 bottom-0 w-px bg-[linear-gradient(to_bottom,transparent,#33333320_20%,#33333320_80%,transparent)] mr-[5%]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 md:mb-40"
        >
          <div className="flex items-center space-x-4 mb-6">
            <span className="w-8 h-px bg-[#ff4747]"></span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-[#ff4747]">MILESTONES</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif tracking-tighter text-white leading-none">
            The Journey.
          </h2>
        </motion.div>
        
        <div className="relative space-y-32 md:space-y-48">
          {/* Animated central/side line */}
          <div className="absolute left-0 md:left-auto md:right-[75%] top-0 bottom-0 w-px bg-[#333333]/30 ml-4 md:ml-0 translate-x-1/2">
            <motion.div 
              className="w-full bg-[#ff4747] origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {timeline.map((event, index) => (
            <motion.div 
              key={event._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16 items-start group relative z-10"
            >
              {/* Year & Category */}
              <div className="md:col-span-1 flex flex-row md:flex-col items-baseline md:items-end text-left md:text-right relative pl-12 md:pl-0 pr-0 md:pr-16">
                {/* Timeline node */}
                <div className="absolute left-4 md:left-auto md:right-0 top-3 md:top-4 md:translate-x-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#ff4747] bg-[#0f0f11] group-hover:bg-[#ff4747] transition-colors duration-500 z-20"></div>
                <div className="absolute left-4 md:left-auto md:right-0 top-3 md:top-4 md:translate-x-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#ff4747] animate-ping opacity-0 group-hover:opacity-30 z-10"></div>
                
                <h3 className="text-4xl md:text-6xl font-sans font-medium text-white tracking-tighter mb-2 group-hover:text-[#ff4747] transition-colors duration-500">{event.year}</h3>
                <span className="text-[#888888] text-[10px] font-mono tracking-[0.2em] uppercase">{event.category || 'MILESTONE'}</span>
              </div>
              
              {/* Content */}
              <div className="md:col-span-3 pl-12 md:pl-0">
                <h4 className="text-3xl md:text-5xl font-serif mb-8 text-[#fafafa] leading-[1.1]">{event.title}</h4>
                
                <div className="flex flex-col lg:flex-row gap-12">
                  <p className="text-[#a0a0a0] text-lg font-light leading-relaxed max-w-xl flex-1">
                    {event.description}
                  </p>
                  
                  {event.imageUrl && (
                    <div className="w-full lg:w-2/5 shrink-0 overflow-hidden rounded-[2px] bg-[#1a1a1c] relative group-hover:shadow-2xl transition-shadow duration-700">
                      <div className="aspect-[4/3] relative">
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
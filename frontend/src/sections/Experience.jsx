import { motion } from 'framer-motion';

export default function Experience({ experience }) {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="relative py-32 md:py-48 px-6 bg-[#0f0f11] overflow-hidden">
      
      {/* Section Transition Header */}
      <div className="absolute top-0 left-0 w-full border-t border-[#333333]/50 flex items-center justify-between px-6 py-4 font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase">
        <span>07</span>
        <span>PROFESSIONAL</span>
        <span>EXPERIENCE</span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 flex items-center space-x-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white tracking-tighter">Experience.</h2>
          <div className="flex-1 h-px bg-[#333333]"></div>
        </motion.div>
        
        <div className="space-y-24">
          {experience.map((exp, index) => (
            <motion.div 
              key={exp._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 group"
            >
              <div className="md:col-span-3 text-[#666666] font-mono text-[10px] tracking-[0.2em] pt-3 flex flex-col md:items-end md:text-right pr-8">
                <span>{exp.startDate}</span>
                <span className="my-2 h-4 w-px bg-[#333333] hidden md:block"></span>
                <span>{exp.endDate || 'PRESENT'}</span>
              </div>
              
              <div className="md:col-span-9 relative">
                <h3 className="text-3xl md:text-4xl font-serif mb-2 group-hover:text-[#ff4747] transition-colors text-white">{exp.position}</h3>
                <h4 className="text-lg font-mono tracking-widest text-[#888888] mb-8 uppercase">{exp.organization}</h4>
                
                <p className="text-[#a0a0a0] leading-relaxed font-light mb-8 whitespace-pre-line text-lg max-w-2xl">
                  {exp.description}
                </p>
                
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="text-[10px] font-mono border border-[#333333] px-3 py-1.5 text-[#888888] uppercase tracking-widest">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
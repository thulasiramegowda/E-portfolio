import { motion } from 'framer-motion';

export default function Education({ education }) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="relative py-32 md:py-48 px-6 bg-[#0f0f11] overflow-hidden">
      
      {/* Section Transition Header */}
      <div className="absolute top-0 left-0 w-full border-t border-[#333333]/50 flex items-center justify-between px-6 py-4 font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase">
        <span>08</span>
        <span>ACADEMIC</span>
        <span>EDUCATION</span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 flex items-center space-x-6"
        >
          <div className="flex-1 h-px bg-[#333333]"></div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white tracking-tighter">Education.</h2>
        </motion.div>
        
        <div className="space-y-24">
          {education.map((edu, index) => (
            <motion.div 
              key={edu._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 group"
            >
              <div className="md:col-span-3 text-[#666666] font-mono text-[10px] tracking-[0.2em] pt-3 flex flex-col md:items-start pl-8 border-l border-[#333333]">
                <span>{edu.startDate}</span>
                <span className="my-2 h-4 w-px bg-[#333333] hidden md:block"></span>
                <span>{edu.endDate || 'PRESENT'}</span>
              </div>
              
              <div className="md:col-span-9 relative">
                <h3 className="text-3xl md:text-4xl font-serif mb-2 group-hover:text-[#ff4747] transition-colors text-white">{edu.degree}</h3>
                <h4 className="text-lg font-mono tracking-widest text-[#888888] mb-4 uppercase">{edu.institution}</h4>
                
                {edu.grade && (
                  <div className="inline-block border border-[#333333] px-3 py-1 font-mono text-[10px] tracking-widest text-[#ff4747] mb-8">
                    GRADE: {edu.grade}
                  </div>
                )}
                
                <p className="text-[#a0a0a0] leading-relaxed font-light whitespace-pre-line text-lg max-w-2xl">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
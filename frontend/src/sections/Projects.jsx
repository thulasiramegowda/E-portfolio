import { motion } from 'framer-motion';
import { ExternalLink, Code2, ArrowRight } from 'lucide-react';

export default function Projects({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="relative py-32 md:py-48 px-6 bg-[#0f0f11] overflow-hidden">
      
      {/* Section Transition Header */}
      <div className="absolute top-0 left-0 w-full border-t border-[#333333]/50 flex items-center justify-between px-6 py-4 font-mono text-[10px] tracking-[0.2em] text-[#888888] uppercase">
        <span>04</span>
        <span>SELECTED WORKS</span>
        <span>CASE STUDIES</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-[#333333]/50 pb-12"
        >
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <span className="w-8 h-px bg-[#ff4747]"></span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#ff4747]">PORTFOLIO</span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif tracking-tighter leading-none">Featured<br/><span className="italic text-[#888888] font-light">Work.</span></h2>
          </div>
          <div className="mt-8 md:mt-0 font-mono text-[10px] tracking-[0.2em] text-[#666666] flex flex-col items-start md:items-end">
            <span>INDEX: 01 — {projects.length < 10 ? `0${projects.length}` : projects.length}</span>
            <span className="mt-2">LATEST UPDATES</span>
          </div>
        </motion.div>
        
        <div className="flex flex-col space-y-32">
          {projects.map((project, index) => {
            const isFeatured = index === 0;
            
            return (
              <motion.div 
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`group cursor-none ${isFeatured ? 'mb-16' : ''}`}
              >
                <div className={`grid grid-cols-1 ${isFeatured ? 'lg:grid-cols-12 gap-12' : 'md:grid-cols-2 gap-8 lg:gap-16'} items-center`}>
                  
                  {/* Project Image */}
                  <div className={`${isFeatured ? 'lg:col-span-8' : 'md:col-span-1'} ${!isFeatured && index % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="relative overflow-hidden bg-[#1a1a1c] isolate">
                      <div className={`relative ${isFeatured ? 'aspect-[16/9]' : 'aspect-[4/5] sm:aspect-[4/3]'} w-full overflow-hidden`}>
                        {project.imageUrl ? (
                          <img 
                            src={project.imageUrl} 
                            alt={project.name} 
                            className="absolute inset-0 w-full h-full object-cover filter contrast-[1.1] saturate-[0.8] group-hover:saturate-100 group-hover:scale-[1.03] transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]" 
                          />
                        ) : (
                          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-[#333333]">
                            <Code2 className="w-12 h-12 mb-4 opacity-30" />
                            <span className="font-serif text-xl tracking-widest">{project.name}</span>
                          </div>
                        )}
                        
                        {/* Hover Overlay & Links */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-between p-8 z-10 pointer-events-none">
                          <div className="flex justify-end space-x-4 pointer-events-auto">
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#ff4747] hover:text-white transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                <Code2 className="w-5 h-5" />
                              </a>
                            )}
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#ff4747] text-white rounded-full flex items-center justify-center hover:scale-110 hover:bg-white hover:text-black transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-75">
                                <ExternalLink className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                          <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                            <span className="font-mono text-[10px] tracking-[0.2em] text-white uppercase bg-black/50 px-3 py-1 backdrop-blur-md">
                              {project.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className={`${isFeatured ? 'lg:col-span-4' : 'md:col-span-1 flex flex-col justify-center'} ${!isFeatured && index % 2 !== 0 ? 'md:order-1' : 'md:order-2'} py-8`}>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#666666]">
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </span>
                      <span className="w-8 h-px bg-[#333333] group-hover:bg-[#ff4747] transition-colors duration-500"></span>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#ff4747] uppercase">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className={`font-serif ${isFeatured ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'} mb-6 group-hover:text-[#ff4747] transition-colors duration-500 tracking-tight leading-[1.1]`}>
                      {project.name}
                    </h3>
                    
                    <p className="text-[#a0a0a0] text-lg font-light leading-relaxed mb-10 max-w-lg">
                      {project.shortDesc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-12">
                      {project.technologies.map(tech => (
                        <span key={tech} className="text-[10px] font-mono tracking-widest border border-[#333333] px-3 py-1 text-[#888888] uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a href={project.liveUrl || project.githubUrl || '#'} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-4 text-white font-mono text-xs tracking-widest uppercase group/link cursor-none">
                      <span className="relative overflow-hidden pb-1">
                        <span className="block transition-transform duration-300 group-hover/link:-translate-y-full">VIEW CASE STUDY</span>
                        <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover/link:translate-y-0 text-[#ff4747]">VIEW CASE STUDY</span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#888888] group-hover/link:text-[#ff4747] group-hover/link:translate-x-2 transition-all duration-300" />
                    </a>
                  </div>
                  
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
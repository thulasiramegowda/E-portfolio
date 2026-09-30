import { motion } from 'framer-motion';

export default function About({ profile }) {
  if (!profile?.longBio) return null;

  // Split bio into paragraphs
  const paragraphs = profile.longBio.split('\n').filter(p => p.trim() !== '');

  return (
    <section id="about" className="relative bg-[#e6e4e0] text-[#0f0f11] overflow-hidden">
      
      {/* Section Transition Header */}
      <div className="absolute top-0 left-0 w-full border-t border-[#0f0f11]/10 flex items-center justify-between px-6 py-4 font-mono text-[10px] tracking-[0.2em] text-[#0f0f11]/40 uppercase">
        <span>02</span>
        <span>THE BUILDER</span>
        <span>WHO I AM</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-32 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-[#ff4747] mb-8 font-bold">IDENTITY</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] tracking-tight">
                Driven by <br className="hidden lg:block"/>
                <span className="italic text-[#666666] font-light">curiosity, logic,</span> <br className="hidden lg:block"/>
                and code.
              </h2>
            </div>
          </motion.div>
          
          {/* Paragraphs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="prose prose-lg md:prose-xl prose-p:font-sans prose-p:font-light prose-p:leading-relaxed prose-p:text-[#333333] max-w-none">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="mb-8">{p}</p>
              ))}
            </div>
            
            <div className="mt-16 pt-12 border-t border-[#0f0f11]/10 grid grid-cols-2 gap-8">
              <div className="group cursor-default">
                <div className="font-mono text-[10px] tracking-[0.2em] text-[#888888] mb-3 transition-colors group-hover:text-[#ff4747]">LOCATION</div>
                <div className="font-serif text-2xl tracking-tight">{profile.location || 'Earth'}</div>
              </div>
              <div className="group cursor-default">
                <div className="font-mono text-[10px] tracking-[0.2em] text-[#888888] mb-3 transition-colors group-hover:text-[#ff4747]">CONTACT</div>
                <a href={`mailto:${profile.email}`} className="font-serif text-2xl tracking-tight cursor-none relative inline-block">
                  <span className="relative z-10">{profile.email || 'Reach out'}</span>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-[#ff4747] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </a>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
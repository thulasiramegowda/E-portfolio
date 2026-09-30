const fs = require('fs');
const path = require('path');

const sections = {
  Hero: `import { motion } from 'framer-motion';

export default function Hero({ profile }) {
  return (
    <section id="hero" className="pt-40 pb-20 px-6 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-block border border-[#333333] px-3 py-1 rounded-full text-xs tracking-widest text-[#888888] mb-6">
            COMPUTER SCIENCE × AI × BUILDING
          </div>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6">
            I'M {profile.name?.toUpperCase() || 'THERE'}.<br/>
            <span className="text-[#888888]">{profile.headline}</span>
          </h1>
          <p className="text-[#888888] max-w-md text-lg mb-8 leading-relaxed">
            {profile.shortBio}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="bg-[#ff4747] text-white px-8 py-3 rounded-full font-medium hover:bg-[#ff2e2e] transition-colors">
              Explore Projects
            </a>
          </div>
        </motion.div>
        
        {profile.photoUrl && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl relative z-10 border border-[#333333]">
              <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#ff4747]/20 to-transparent blur-3xl z-0 rounded-full opacity-50"></div>
          </motion.div>
        )}
      </div>
    </section>
  );
}`,
  About: `import { motion } from 'framer-motion';

export default function About({ profile }) {
  if (!profile.longBio) return null;
  
  return (
    <section id="about" className="py-24 px-6 border-t border-[#333333]/50">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-xs tracking-widest text-[#888888] uppercase mb-8">About Me</h2>
          <div className="text-xl md:text-3xl font-serif leading-relaxed text-[#fafafa] space-y-6 whitespace-pre-line">
            {profile.longBio}
          </div>
        </motion.div>
      </div>
    </section>
  );
}`,
  Journey: `import { motion } from 'framer-motion';

export default function Journey({ timeline }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <section id="journey" className="py-24 px-6 border-t border-[#333333]/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif mb-16">The Journey</h2>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-[#333333] before:to-transparent">
          {timeline.map((event, index) => (
            <motion.div 
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#333333] bg-[#0f0f11] group-[.is-active]:text-[#ff4747] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                <div className="w-2 h-2 bg-[#ff4747] rounded-full"></div>
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-[#333333] bg-[#1a1a1c]/50 hover:bg-[#1a1a1c] transition-colors">
                <span className="text-[#ff4747] font-mono text-sm mb-2 block">{event.year}</span>
                <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{event.description}</p>
                {event.imageUrl && (
                  <img src={event.imageUrl} alt={event.title} className="mt-4 rounded-lg w-full object-cover max-h-48 border border-[#333333]" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  Projects: `import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

export default function Projects({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 px-6 border-t border-[#333333]/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif mb-16">Selected Works</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#333333] mb-6 relative bg-[#1a1a1c]">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#333333] font-serif text-2xl">{project.name}</div>
                )}
                
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#ff4747] transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#ff4747] transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs text-[#888888] font-mono mb-2 uppercase tracking-wider">{project.category} {project.date && \`• \${project.date}\`}</div>
                  <h3 className="text-2xl font-serif mb-3 group-hover:text-[#ff4747] transition-colors">{project.name}</h3>
                  <p className="text-[#888888] mb-4">{project.shortDesc}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-xs border border-[#333333] px-3 py-1 rounded-full text-[#888888] bg-[#1a1a1c]">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  Skills: `import { motion } from 'framer-motion';

export default function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;

  // Group by category
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-24 px-6 border-t border-[#333333]/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif mb-16">Capabilities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.keys(grouped).map((category, index) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-[#888888] font-mono text-sm uppercase tracking-widest mb-6 border-b border-[#333333] pb-2">{category}</h3>
              <ul className="space-y-4">
                {grouped[category].map(skill => (
                  <li key={skill._id} className="text-lg text-[#fafafa] font-medium flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-[#ff4747] before:rounded-full before:mr-3">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  Experience: `import { motion } from 'framer-motion';

export default function Experience({ experience }) {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 px-6 border-t border-[#333333]/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif mb-16">Experience</h2>
        
        <div className="space-y-12">
          {experience.map((exp, index) => (
            <motion.div 
              key={exp._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-l border-[#333333] pl-8 relative"
            >
              <div className="absolute w-3 h-3 bg-[#0f0f11] border border-[#ff4747] rounded-full -left-[6.5px] top-2"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className="text-2xl font-serif">{exp.position}</h3>
                <span className="text-[#888888] font-mono text-sm mt-1 md:mt-0">{exp.startDate} — {exp.endDate}</span>
              </div>
              
              <h4 className="text-[#ff4747] mb-4 text-lg">{exp.organization}</h4>
              <p className="text-[#888888] leading-relaxed mb-4 whitespace-pre-line">{exp.description}</p>
              
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map(tech => (
                    <span key={tech} className="text-xs bg-[#1a1a1c] border border-[#333333] px-3 py-1 rounded text-[#888888]">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  Education: `import { motion } from 'framer-motion';

export default function Education({ education }) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-24 px-6 border-t border-[#333333]/50 bg-[#1a1a1c]/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif mb-16">Education</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div 
              key={edu._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0f0f11] border border-[#333333] p-8 rounded-2xl"
            >
              <div className="text-[#888888] font-mono text-sm mb-4">{edu.year}</div>
              <h3 className="text-xl font-medium mb-1">{edu.program}</h3>
              <h4 className="text-[#ff4747] mb-4">{edu.institution}</h4>
              {edu.grade && <div className="text-sm border border-[#333333] inline-block px-3 py-1 rounded bg-[#1a1a1c] mb-4">Grade: {edu.grade}</div>}
              {edu.description && <p className="text-[#888888] text-sm leading-relaxed">{edu.description}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  Achievements: `import { motion } from 'framer-motion';

export default function Achievements({ achievements }) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-24 px-6 border-t border-[#333333]/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif mb-16">Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((ach, index) => (
            <motion.div 
              key={ach._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-[#333333] rounded-xl overflow-hidden group hover:border-[#ff4747]/50 transition-colors bg-[#1a1a1c]"
            >
              {ach.imageUrl && (
                <div className="h-48 overflow-hidden border-b border-[#333333]">
                  <img src={ach.imageUrl} alt={ach.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}
              <div className="p-6">
                <div className="text-xs text-[#888888] font-mono mb-2">{ach.date}</div>
                <h3 className="text-lg font-medium mb-1">{ach.title}</h3>
                <h4 className="text-[#ff4747] text-sm mb-3">{ach.organization}</h4>
                <p className="text-[#888888] text-sm line-clamp-3">{ach.description}</p>
                {ach.url && (
                  <a href={ach.url} target="_blank" rel="noreferrer" className="inline-block mt-4 text-sm text-white hover:text-[#ff4747] transition-colors">
                    View Details &rarr;
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  Certificates: `import { motion } from 'framer-motion';

export default function Certificates({ certificates }) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-24 px-6 border-t border-[#333333]/50 bg-[#1a1a1c]/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif mb-16">Certifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <motion.div 
              key={cert._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0f0f11] border border-[#333333] p-6 rounded-xl text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#1a1a1c] border border-[#333333] flex items-center justify-center mb-4 overflow-hidden">
                {cert.imageUrl ? <img src={cert.imageUrl} alt="cert" className="w-full h-full object-cover" /> : <div className="text-2xl font-serif text-[#888888]">C</div>}
              </div>
              <h3 className="font-medium mb-1">{cert.title}</h3>
              <p className="text-[#888888] text-sm mb-2">{cert.issuer}</p>
              <div className="text-xs text-[#555555] font-mono mb-4">{cert.date}</div>
              {cert.credentialUrl && (
                <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-xs border border-[#333333] px-4 py-1.5 rounded-full hover:bg-[#ff4747] hover:text-white hover:border-[#ff4747] transition-colors mt-auto">
                  Verify Credential
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,
  Contact: `import { motion } from 'framer-motion';

export default function Contact({ profile }) {
  return (
    <section id="contact" className="py-32 px-6 border-t border-[#333333]/50 bg-gradient-to-b from-transparent to-[#1a1a1c]/50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-6xl font-serif mb-6">Let's build something.</h2>
          <p className="text-[#888888] text-lg mb-12 max-w-2xl mx-auto">
            I'm currently looking for new opportunities and exciting projects. 
            My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          {profile.email && (
            <a href={\`mailto:\${profile.email}\`} className="inline-block bg-white text-black font-medium px-8 py-4 rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-lg shadow-white/5">
              Say Hello
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}`
};

Object.keys(sections).forEach(key => {
  fs.writeFileSync(path.join(__dirname, 'src', 'sections', key + '.jsx'), sections[key]);
});

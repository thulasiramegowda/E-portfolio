import { motion } from 'framer-motion';

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
}
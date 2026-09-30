import { motion } from 'framer-motion';

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
}
'use client';

import ScrollReveal from '../ui/ScrollReveal';
import { motion } from 'framer-motion';
import { BookOpen, Scale, Users, FlaskConical } from 'lucide-react';
import { useLang } from '../../lib/LanguageContext';

const gradientText = { background:'linear-gradient(135deg,#06038D,#19AAED)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', paddingTop: '4px', paddingBottom: '4px' };

export default function TopicsSection() {
  const { t } = useLang();
  const tp = t.topics;
  const topics = [
    { icon:BookOpen,     title:tp.t1, desc:tp.t1d, num:'01', color:'#06038D', bg:'rgba(6,3,141,0.04)',    border:'rgba(6,3,141,0.12)' },
    { icon:Scale,        title:tp.t2, desc:tp.t2d, num:'02', color:'#19AAED', bg:'rgba(25,170,237,0.05)', border:'rgba(25,170,237,0.18)' },
    { icon:Users,        title:tp.t3, desc:tp.t3d, num:'03', color:'#138808', bg:'rgba(19,136,8,0.04)',   border:'rgba(19,136,8,0.15)' },
    { icon:FlaskConical, title:tp.t4, desc:tp.t4d, num:'04', color:'#0e8bc7', bg:'rgba(14,139,199,0.05)', border:'rgba(14,139,199,0.15)' },
  ];
  return (
    <section id="topics" className="relative py-28 overflow-hidden section-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="section-label mb-4">{tp.label}</p>
            <h2 className="section-title text-4xl sm:text-5xl mb-4" style={{ color:'#0A0840' }}>
              {tp.title1}{' '}<span style={gradientText}>{tp.title2}</span>
            </h2>
            <p className="max-w-md mx-auto" style={{ color:'#5B5A9A' }}>{tp.sub}</p>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, i) => (
            <ScrollReveal key={topic.title} delay={i*0.1} direction="up">
              <motion.div whileHover={{ y:-8 }} transition={{ duration:0.3 }}
                className="relative rounded-3xl p-7 h-full overflow-hidden cursor-default group shadow-blue"
                style={{ background:'#FFFFFF', border:`1px solid ${topic.border}` }}>
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background:`radial-gradient(circle at 30% 20%,${topic.color}08,transparent 60%)` }} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background:topic.bg }}>
                      <topic.icon size={22} style={{ color:topic.color }} />
                    </div>
                    <span className="text-5xl font-black" style={{ fontFamily:'Playfair Display,serif', color:`${topic.color}18` }}>{topic.num}</span>
                  </div>
                  <h3 className="font-bold text-base mb-3 leading-tight" style={{ color:'#0A0840' }}>{topic.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color:'#5B5A9A' }}>{topic.desc}</p>
                </div>
                <div className="absolute bottom-0 left-4 right-4 h-px rounded-full"
                  style={{ background:`linear-gradient(90deg,transparent,${topic.color}40,transparent)` }} />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

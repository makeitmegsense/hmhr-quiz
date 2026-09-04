'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
import { UserCircle, FileText, Play, CheckCircle } from 'lucide-react';
import { useLang } from '../../lib/LanguageContext';

const gradientText = { background:'linear-gradient(135deg,#06038D,#19AAED)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', paddingTop: '4px', paddingBottom: '4px' };

export default function HowItWorksSection() {
  const { t } = useLang();
  const h = t.how;
  const steps = [
    { num:'01', icon:UserCircle,  title:h.s1t, desc:h.s1d, color:'#06038D' },
    { num:'02', icon:FileText,    title:h.s2t, desc:h.s2d, color:'#19AAED' },
    { num:'03', icon:Play,        title:h.s3t, desc:h.s3d, color:'#138808' },
    { num:'04', icon:CheckCircle, title:h.s4t, desc:h.s4d, color:'#0e8bc7' },
  ];
  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden section-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="section-label mb-4">{h.label}</p>
            <h2 className="section-title text-4xl sm:text-5xl mb-4" style={{ color:'#0A0840' }}>
              {h.title1}{' '}<span style={gradientText}>{h.title2}</span>{' '}{h.title3}
            </h2>
            <p className="max-w-md mx-auto" style={{ color:'#5B5A9A' }}>{h.sub}</p>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i*0.12} direction="up">
              <motion.div whileHover={{ y:-10, scale:1.02 }} transition={{ duration:0.3 }}
                className="relative rounded-3xl p-7 h-full cursor-default overflow-hidden group shadow-blue"
                style={{ background:'#FFFFFF', border:`1px solid ${step.color}15` }}>
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background:`radial-gradient(circle at 50% 0%,${step.color}08,transparent 70%)` }} />
                <div className="absolute top-0 left-6 right-6 h-px rounded-full"
                  style={{ background:`linear-gradient(90deg,transparent,${step.color}60,transparent)` }} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background:`${step.color}10` }}>
                      <step.icon size={26} style={{ color:step.color }} />
                    </div>
                    <span className="font-black text-4xl leading-none"
                      style={{ fontFamily:'Playfair Display,serif', color:`${step.color}20` }}>{step.num}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3" style={{ color:'#0A0840' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color:'#5B5A9A' }}>{step.desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

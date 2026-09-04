'use client';

import ScrollReveal from '../ui/ScrollReveal';
import { motion } from 'framer-motion';
import { Award, Share2, Trophy, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
import { useLang } from '../../lib/LanguageContext';

const gradientText = { background:'linear-gradient(135deg,#06038D,#19AAED)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', paddingTop: '4px', paddingBottom: '4px' };

export default function RewardsSection() {
  const { t } = useLang();
  const r = t.rewards;
  const rewards = [
    { icon:Award,  title:r.r1t, subtitle:r.r1s, desc:r.r1d, color:'#06038D' },
    { icon:Share2, title:r.r2t, subtitle:r.r2s, desc:r.r2d, color:'#19AAED' },
    { icon:Trophy, title:r.r3t, subtitle:r.r3s, desc:r.r3d, color:'#138808' },
    { icon:HeartHandshake, title:r.r4t, subtitle:r.r4s, desc:r.r4d, color:'#FF9933' },
  ];
  return (
    <section id="rewards" className="relative py-28 overflow-hidden section-blue-tint">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse at 50% 50%,rgba(25,170,237,0.06) 0%,transparent 70%)' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="section-label mb-4">{r.label}</p>
            <h2 className="section-title text-4xl sm:text-5xl mb-4" style={{ color:'#0A0840' }}>
              {r.title1}{' '}<span style={gradientText}>{r.title2}</span>
            </h2>
            <p className="max-w-md mx-auto" style={{ color:'#5B5A9A' }}>{r.sub}</p>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {rewards.map(({ icon:Icon, title, subtitle, desc, color }, i) => (
            <ScrollReveal key={title} delay={i*0.15} direction="up">
              <motion.div whileHover={{ y:-10, scale:1.02 }} transition={{ duration:0.35 }}
                className="relative rounded-3xl p-8 text-center overflow-hidden group cursor-default h-full shadow-blue"
                style={{ background:'#FFFFFF', border:`1px solid ${color}15` }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background:`radial-gradient(circle at 50% 0%,${color}06,transparent 70%)` }} />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 rounded-full"
                  style={{ background:`linear-gradient(90deg,transparent,${color},transparent)` }} />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background:`${color}10`, border:`1px solid ${color}20` }}>
                    <Icon size={28} style={{ color }} />
                  </div>
                  <h3 className="font-bold text-xl mb-1" style={{ fontFamily:'Playfair Display,serif', color:'#0A0840' }}>{title}</h3>
                  <p className="text-xs tracking-widest uppercase mb-4" style={{ color }}>{subtitle}</p>
                  <p className="text-sm leading-relaxed" style={{ color:'#5B5A9A' }}>{desc}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.3}>
          <div className="text-center">
            <Link href="/quiz"><button className="btn-primary text-base px-10 py-4">{r.cta}</button></Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

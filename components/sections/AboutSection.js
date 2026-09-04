'use client';

import ScrollReveal from '../ui/ScrollReveal';
import { Shield, Scale, FlameKindling } from 'lucide-react';
import { useLang } from '../../lib/LanguageContext';

const gradientText = { background:'linear-gradient(135deg,#06038D,#19AAED)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', paddingTop: '4px', paddingBottom: '4px'};

export default function AboutSection() {
  const { t } = useLang();
  const a = t.about;

  const cards = [
    { icon:Shield,        title:a.card1t, text:a.card1d, color:'#06038D', delay:0.1 },
    { icon:Scale,         title:a.card2t, text:a.card2d, color:'#19AAED', delay:0.2 },
    { icon:FlameKindling, title:a.card3t, text:a.card3d, color:'#138808', delay:0.3 },
  ];
 
  return (
    <section id="about" className="relative py-28 overflow-hidden section-white">
      <div className="tricolor-line absolute top-0 left-0 right-0" />
      <div className="absolute left-0 top-1/2 w-72 h-72 -translate-y-1/2 pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(25,170,237,0.08) 0%,transparent 70%)', filter:'blur(50px)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <ScrollReveal direction="left">
              <p className="section-label mb-4">{a.label}</p>
              <h2 className="section-title text-4xl sm:text-5xl lg:text-5xl mb-8" style={{ color:'#0A0840' }}>
                {a.title1}{' '}<span style={gradientText}>{a.title2}</span>{' '}{a.title3}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}><p className="text-base leading-relaxed mb-6" style={{ color:'#2D2B7A' }}>{a.p1}</p></ScrollReveal>
            <ScrollReveal delay={0.25}><p className="text-base leading-relaxed mb-6" style={{ color:'#2D2B7A' }}>{a.p2}</p></ScrollReveal>
            <ScrollReveal delay={0.35}><p className="text-base leading-relaxed mb-6" style={{ color:'#2D2B7A' }}>{a.p3}</p></ScrollReveal>
            <ScrollReveal delay={0.4}><p className="text-base leading-relaxed mb-10" style={{ color:'#5B5A9A' }}>{a.p4}</p></ScrollReveal>
            <ScrollReveal delay={0.45} direction="scale">
              <div className="relative rounded-2xl p-6 overflow-hidden"
                style={{ background:'linear-gradient(135deg,rgba(6,3,141,0.05),rgba(25,170,237,0.05))', border:'1px solid rgba(6,3,141,0.15)' }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background:'linear-gradient(90deg,transparent,#19AAED,transparent)' }} />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background:'rgba(25,170,237,0.12)' }}>
                    <FlameKindling size={20} style={{ color:'#19AAED' }} />
                  </div>
                  <p className="font-semibold text-base leading-relaxed italic" style={{ color:'#06038D' }}>{a.quote}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="flex flex-col gap-6">
            {cards.map(({ icon:Icon, title, text, color, delay }) => (
              <ScrollReveal key={title} direction="right" delay={delay}>
                <div className="rounded-2xl p-6 flex items-start gap-5 card-hover shadow-blue"
                  style={{ background:'#FFFFFF', border:`1px solid ${color}18` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background:`${color}12` }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-2" style={{ color:'#0A0840' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color:'#5B5A9A' }}>{text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

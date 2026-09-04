'use client';

import ScrollReveal from '../ui/ScrollReveal';
import { BookOpen, Scale, Users } from 'lucide-react';
import AshokaChakra from '../ui/AshokaChakra';
import { useLang } from '../../lib/LanguageContext';

const gradientText = { background:'linear-gradient(135deg,#06038D,#19AAED)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', paddingTop: '4px', paddingBottom: '4px' };

export default function LaunchSection() {
  const { t } = useLang();
  const l = t.launch;
  const topics = [
    { icon:BookOpen, label:l.t1, color:'#06038D' },
    { icon:Scale,    label:l.t2, color:'#19AAED' },
    { icon:Users,    label:l.t3, color:'#138808' },
  ];
  return (
    <section id="launch" className="relative py-28 overflow-hidden section-blue-tint">
      <div className="absolute -top-20 right-0 pointer-events-none hidden lg:block"><AshokaChakra size={360} opacity={0.06} /></div>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background:'linear-gradient(90deg,transparent,rgba(25,170,237,0.4),transparent)' }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <p className="section-label mb-4">{l.label}</p>
          <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl mb-6" style={{ color:'#0A0840' }}>
            {l.title1}{' '}<span style={gradientText}>{l.title2}</span>
          </h2>
          <div className="tricolor-line w-24 mx-auto mb-10" />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden shadow-blue"
            style={{ background:'#FFFFFF', border:'1px solid rgba(6,3,141,0.10)' }}>
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background:'linear-gradient(90deg,#FF9933 33%,white 33%,white 66%,#138808 66%)' }} />
            <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color:'#2D2B7A' }}>
              {l.p1}
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {topics.map(({ icon:Icon, label, color }) => (
                <div key={label} className="rounded-2xl p-5 text-center" style={{ background:`${color}08`, border:`1px solid ${color}20` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background:`${color}15` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <p className="text-sm font-medium" style={{ color:'#0A0840' }}>{label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed" style={{ color:'#5B5A9A' }}>
              {l.p2}{' '}<strong style={{ color:'#2D2B7A' }}>{l.p2b}</strong>{' '}{l.p2c}
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <div className="inline-flex items-center gap-3 rounded-full px-6 py-3"
            style={{ background:'rgba(25,170,237,0.08)', border:'1px solid rgba(25,170,237,0.25)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:'#19AAED' }} />
            <span className="text-sm font-medium" style={{ color:'#0e8bc7' }}>{l.badge}</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

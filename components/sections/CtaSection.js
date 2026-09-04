'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '../ui/ScrollReveal';
import Link from 'next/link';
import AshokaChakra from '../ui/AshokaChakra';
import { useLang } from '../../lib/LanguageContext';

export default function CtaSection() {
  const { t } = useLang();
  const c = t.cta;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title:'Hum Mein Hai Rajiv', text:"Test your knowledge of Rajiv Gandhi's life and legacy! Join the movement.", url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    }
  };

  return (
    <section id="cta" className="relative py-32 overflow-hidden"
      style={{ background:'linear-gradient(135deg,#06038D 0%,#0805b0 40%,#04026a 70%,#19AAED 100%)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background:'radial-gradient(ellipse at 20% 50%,rgba(25,170,237,0.20) 0%,transparent 55%),radial-gradient(ellipse at 80% 30%,rgba(255,255,255,0.05) 0%,transparent 50%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 spin-slow">
          <AshokaChakra size={900} opacity={0.06} />
        </div>
      </div>
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background:'linear-gradient(90deg,#FF9933 33%,white 33%,white 66%,#138808 66%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-10"
            style={{ background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.25)' }}>
            <span className="text-base">&#127470;&#127475;</span>
            <span className="text-xs font-bold tracking-widest uppercase text-white/80">{c.badge}</span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="section-title text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-none">
            {c.title1}{' '}
            <span style={{ background:'linear-gradient(135deg,#ffffff 0%,#19AAED 60%,#ffffff 100%)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmer 3s linear infinite', paddingTop: '5px', paddingBottom: '5px' }}>
              {c.title2}
            </span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-4 text-white/80">{c.p1}</p>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-14 text-white/65">
            {c.p2}{' '}<strong className="text-white">{c.p2b}</strong>
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
            <Link href="/quiz">
              <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.98 }}
                className="text-base px-10 py-5 text-lg font-bold rounded-full text-white transition-all"
                style={{ background:'rgba(255,255,255,0.15)', border:'2px solid rgba(255,255,255,0.40)', backdropFilter:'blur(8px)', boxShadow:'0 8px 32px rgba(0,0,0,0.20)' }}>
                {c.btn1}
              </motion.button>
            </Link>
            <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.98 }} onClick={handleShare}
              className="text-base px-10 py-5 font-bold rounded-full text-white transition-all"
              style={{ background:'#19AAED', boxShadow:'0 8px 32px rgba(25,170,237,0.40)' }}>
              {c.btn2}
            </motion.button>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <div className="tricolor-line w-48 mx-auto mb-10" />
          <p className="text-sm tracking-wider text-white/40">{c.preamble}</p>
          <p className="text-xs mt-2 tracking-widest uppercase text-white/25">{c.preambleSub}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

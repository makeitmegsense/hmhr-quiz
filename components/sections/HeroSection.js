'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AshokaChakra from '../ui/AshokaChakra';
import { useLang } from '../../lib/LanguageContext';

const particles = [
  { top:'10%', left:'7%',  size:8, delay:0,   color:'#06038D' },
  { top:'20%', right:'10%',size:5, delay:1,   color:'#19AAED' },
  { top:'65%', left:'4%',  size:6, delay:2,   color:'#19AAED' },
  { top:'75%', right:'6%', size:9, delay:0.5, color:'#06038D' },
  { top:'40%', left:'2%',  size:4, delay:1.5, color:'#19AAED' },
  { top:'82%', left:'18%', size:5, delay:2.5, color:'#06038D' },
  { top:'15%', right:'22%',size:6, delay:3,   color:'#19AAED' },
  { top:'55%', right:'4%', size:7, delay:1.8, color:'#06038D' },
];

const gradientText = {
  background:'linear-gradient(135deg,#06038D,#19AAED)',
  WebkitBackgroundClip:'text',
  WebkitTextFillColor:'transparent',
  backgroundClip:'text',
  paddingTop:'4px',
  paddingBottom:'4px'
};

export default function HeroSection() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient"
      style={{ paddingTop:'80px' }}
    >

      {/* =====================================================
          LARGE RAJIV GANDHI BACKGROUND PORTRAIT
          ===================================================== */}

      <div
        className="
          absolute
          left-[18%]
          top-1/2
          -translate-y-1/2
          w-[650px]
          h-[780px]
          xl:w-[800px]
          xl:h-[920px]
          pointer-events-none
          z-0
        "
      >
        <Image
          src="/rajiv-gandhi-without-background.png"
          alt=""
          fill
          priority
          sizes="600px"
          className="object-contain object-center"
          style={{
            opacity:1,
            mixBlendMode:'multiply',
          }}
        />
      </div>


      {/* =====================================================
          FLOATING PARTICLES
          ===================================================== */}

      {particles.map((p,i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none z-[1]"
          style={{
            top:p.top,
            left:p.left,
            right:p.right,
            width:p.size,
            height:p.size,
            background:p.color
          }}
          animate={{
            opacity:[0.2,0.7,0.2],
            scale:[1,1.5,1]
          }}
          transition={{
            duration:3+p.delay,
            repeat:Infinity,
            delay:p.delay,
            ease:'easeInOut'
          }}
        />
      ))}


      {/* =====================================================
          LEFT ASHOKA CHAKRA
          ===================================================== */}

      <div className="absolute -left-32 top-1/4 spin-slow pointer-events-none hidden lg:block z-0">
        <AshokaChakra
          size={560}
          opacity={0.05}
        />
      </div>


      {/* =====================================================
          RIGHT ASHOKA CHAKRA
          ===================================================== */}

      <div className="absolute -right-24 top-10 spin-slow pointer-events-none hidden lg:block z-0">
        <AshokaChakra
          size={420}
          opacity={0.07}
        />
      </div>


      {/* =====================================================
          BACKGROUND GLOW
          ===================================================== */}

      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background:'radial-gradient(circle,rgba(25,170,237,0.12) 0%,transparent 70%)',
          filter:'blur(50px)'
        }}
      />

      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none z-0"
        style={{
          background:'radial-gradient(circle,rgba(6,3,141,0.08) 0%,transparent 70%)',
          filter:'blur(50px)'
        }}
      />


      {/* =====================================================
          MAIN HERO CONTENT
          ===================================================== */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">


          {/* =================================================
              LEFT SIDE — TEXT
              ================================================= */}

          <div className="text-center lg:text-left">

            {/* Title */}
            <motion.div
              initial={{
                opacity:0,
                y:30
              }}
              animate={{
                opacity:1,
                y:0
              }}
              transition={{
                duration:0.7,
                delay:0.15
              }}
            >

              <h1
                className="section-title text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl mb-2"
                style={{
                  color:'#0A0840'
                }}
              >
                {h.title1}{' '}
                <span style={gradientText}>
                  {h.title2}
                </span>
              </h1>

              <h1
                className="section-title text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl mb-6"
                style={gradientText}
              >
                {h.title3}
              </h1>

              <div className="tricolor-line w-32 mb-6 mx-auto lg:mx-0" />

            </motion.div>


            {/* Subtitle */}
            <motion.p
              initial={{
                opacity:0,
                y:20
              }}
              animate={{
                opacity:1,
                y:0
              }}
              transition={{
                duration:0.7,
                delay:0.3
              }}
              className="text-lg sm:text-xl mb-4 leading-relaxed max-w-xl mx-auto lg:mx-0"
              style={{
                color:'#0e8bc7'
              }}
            >
              {h.sub}
            </motion.p>


            {/* Initiative */}
            <motion.p
              initial={{
                opacity:0
              }}
              animate={{
                opacity:1
              }}
              transition={{
                duration:0.6,
                delay:0.4
              }}
              className="text-sm font-semibold tracking-widest uppercase mb-10"
              style={{
                color:'#8886C0'
              }}
            >
              {h.initiative}
            </motion.p>


            {/* Buttons */}
            <motion.div
              initial={{
                opacity:0,
                y:20
              }}
              animate={{
                opacity:1,
                y:0
              }}
              transition={{
                duration:0.6,
                delay:0.5
              }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start"
            >

              <Link href="/quiz">
                <button
                  className="
                    btn-primary
                    text-base
                    px-8
                    py-4
                    w-full
                    sm:w-auto
                    pulse-glow
                  "
                >
                  {h.cta1}
                </button>
              </Link>


              <a href="#about">
                <button
                  className="
                    btn-secondary
                    text-base
                    px-8
                    py-4
                    w-full
                    sm:w-auto
                  "
                >
                  {h.cta2}
                </button>
              </a>

            </motion.div>


            {/* Stats */}
            <motion.div
              initial={{
                opacity:0
              }}
              animate={{
                opacity:1
              }}
              transition={{
                delay:0.8
              }}
              className="
                flex
                gap-8
                mt-12
                justify-center
                lg:justify-start
              "
            >

              {[
                {
                  num:'38',
                  label:h.stat1
                },
                {
                  num:'30s',
                  label:h.stat2
                },
                {
                  num:'∞',
                  label:h.stat3
                }
              ].map((s) => (

                <div
                  key={s.label}
                  className="text-center"
                >

                  <div
                    className="text-3xl font-black"
                    style={gradientText}
                  >
                    {s.num}
                  </div>

                  <div
                    className="
                      text-xs
                      mt-1
                      tracking-wide
                      uppercase
                    "
                    style={{
                      color:'#8886C0'
                    }}
                  >
                    {s.label}
                  </div>

                </div>

              ))}

            </motion.div>

          </div>


          {/* =================================================
              RIGHT SIDE — CIRCULAR HERO ELEMENT
              ================================================= */}

          <motion.div
            initial={{
              opacity:0,
              scale:0.9,
              x:40
            }}
            animate={{
              opacity:1,
              scale:1,
              x:0
            }}
            transition={{
              duration:0.9,
              delay:0.3,
              ease:[0.22,1,0.36,1]
            }}
            className="
              hidden
              lg:flex
              items-center
              justify-center
            "
          >

            <div className="relative">

              {/* =================================================
                  MAIN FLOATING COMPOSITION
                  ================================================= */}

              <motion.div
                animate={{
                  y:[-12,12,-12]
                }}
                transition={{
                  duration:6,
                  repeat:Infinity,
                  ease:'easeInOut'
                }}
                className="relative"
              >


                {/* =================================================
                    MAIN CIRCULAR FRAME
                    ================================================= */}

                <div
                  className="
                    w-80
                    h-80
                    xl:w-96
                    xl:h-96
                    rounded-full
                    flex
                    flex-col
                    items-center
                    justify-center
                    p-8
                  "
                  style={{
                    background:'rgba(255,255,255,0.80)',
                    border:'2px solid rgba(6,3,141,0.15)',
                    boxShadow:'0 20px 80px rgba(6,3,141,0.15)'
                  }}
                >

                  {/* Inner circle */}
                  <div
                    className="
                      relative
                      w-full
                      h-full
                      rounded-full
                      overflow-hidden
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      background:
                        'linear-gradient(135deg,rgba(6,3,141,0.05),rgba(25,170,237,0.08))'
                    }}
                  >

                    {/* =================================================
                        CENTER CONTENT
                        ================================================= */}

                    <div className="text-center">

                      <div className="text-7xl mb-4">
                        📡
                      </div>

                      <div
                        className="
                          font-semibold
                          text-sm
                          tracking-wider
                        "
                        style={{
                          color:'#06038D'
                        }}
                      >
                        {h.heroSub1}
                      </div>

                      <div
                        className="
                          text-xs
                          tracking-widest
                          mt-1
                        "
                        style={{
                          color:'#8886C0'
                        }}
                      >
                        {h.heroSub2}
                      </div>

                      <div className="tricolor-line w-20 mx-auto mt-3" />

                    </div>

                  </div>

                </div>


                {/* =================================================
                    TOP LEFT BADGE
                    ================================================= */}

                <motion.div
                  animate={{
                    y:[-8,8,-8],
                    rotate:[-2,2,-2]
                  }}
                  transition={{
                    duration:4,
                    repeat:Infinity,
                    ease:'easeInOut'
                  }}
                  className="
                    absolute
                    -top-4
                    -left-6
                    rounded-2xl
                    px-4
                    py-3
                  "
                  style={{
                    background:'#FFFFFF',
                    border:'1px solid rgba(6,3,141,0.15)',
                    boxShadow:'0 4px 20px rgba(6,3,141,0.10)'
                  }}
                >

                  <div
                    className="text-xs font-bold"
                    style={{
                      color:'#06038D'
                    }}
                  >
                    {h.badge1}
                  </div>

                  <div
                    className="text-xs"
                    style={{
                      color:'#8886C0'
                    }}
                  >
                    {h.badge1sub}
                  </div>

                </motion.div>


                {/* =================================================
                    BOTTOM RIGHT BADGE
                    ================================================= */}

                <motion.div
                  animate={{
                    y:[8,-8,8],
                    rotate:[2,-2,2]
                  }}
                  transition={{
                    duration:5,
                    repeat:Infinity,
                    ease:'easeInOut',
                    delay:1
                  }}
                  className="
                    absolute
                    -bottom-4
                    -right-6
                    rounded-2xl
                    px-4
                    py-3
                  "
                  style={{
                    background:'#FFFFFF',
                    border:'1px solid rgba(25,170,237,0.25)',
                    boxShadow:'0 4px 20px rgba(25,170,237,0.12)'
                  }}
                >

                  <div
                    className="text-xs font-bold"
                    style={{
                      color:'#19AAED'
                    }}
                  >
                    {h.badge2}
                  </div>

                  <div
                    className="text-xs"
                    style={{
                      color:'#8886C0'
                    }}
                  >
                    {h.badge2sub}
                  </div>

                </motion.div>

              </motion.div>


              {/* =================================================
                  ASHOKA CHAKRA BEHIND CIRCLE
                  ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  -z-10
                  spin-slow
                "
              >
                <AshokaChakra
                  size={520}
                  opacity={0.09}
                />
              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
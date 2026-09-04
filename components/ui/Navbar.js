'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useLang } from '../../lib/LanguageContext';

export default function Navbar() {
  const { t } = useLang();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* =========================================================
     NAVIGATION
  ========================================================= */

const navLinks = [
  {
    label: t.nav.about,
    href: '/',
    type: 'anchor',
  },
  {
    label: t.nav.champions,
    href: '/leaderboard',
    type: 'route',
  },
  {
    label: 'Seva Dal Home',
    href: 'https://congressevadal.in/',
    type: 'route',
  },
];

  /* =========================================================
     SCROLL EFFECT
  ========================================================= */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* =========================================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ========================================================= */

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* =========================================================
     PREVENT BACKGROUND SCROLL WHEN MOBILE MENU IS OPEN
  ========================================================= */

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* =========================================================
     ACTIVE STATE
  ========================================================= */

 const isActive = (href, type) => {
  if (type === 'route') {
    return pathname === href;
  }

  return false;
};
  /* =========================================================
     CLOSE MOBILE MENU
  ========================================================= */

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <motion.nav
        initial={{
          y: -80,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
        className={`
          fixed
          top-0
          left-0
          right-0
          z-50
          border-b
          transition-all
          duration-300
          ${
            scrolled
              ? 'border-slate-200 shadow-sm'
              : 'border-slate-100'
          }
        `}
        style={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* =================================================
              MAIN NAV ROW
          ================================================= */}

          <div className="flex min-h-[76px] md:min-h-[88px] items-center justify-between">


            {/* =================================================
                LOGO / BRAND
            ================================================= */}

            <Link
              href="/"
              className="
                flex
                shrink-0
                items-center
                gap-3
                group
              "
              onClick={closeMobileMenu}
            >

              {/* Logo */}
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  sm:h-14
                  sm:w-14
                "
              >
                <img
                  src="/Congress_Seva_Dal_2.png"
                  alt="Hum Mein Hai Rajiv"
                  className="
                    h-full
                    w-full
                    object-contain
                    rounded-xl
                  "
                />
              </div>


              {/* Brand text */}
              <div className="flex flex-col justify-center">

                <span
                  className="
                    text-lg
                    sm:text-xl
                    font-bold
                    leading-tight
                    tracking-tight
                  "
                  style={{
                    color: '#06038D',
                  }}
                >
                  Hum Mein Hai Rajiv
                </span>

                <span
                  className="
                    mt-1
                    text-[9px]
                    sm:text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                  "
                  style={{
                    color: '#19AAED',
                  }}
                >
                  A Tribute • A Legacy • A Generation
                </span>

              </div>

            </Link>


            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <div className="hidden md:flex items-center">

              <div className="flex items-center gap-7 lg:gap-9">

                {navLinks.map((link) => {

                  const active = isActive(
                    link.href,
                    link.type
                  );

                  return link.type === 'route' ? (

                    <Link
                      key={link.href}
                      href={link.href}
                      className={`
                        relative
                        flex
                        h-[88px]
                        items-center
                        text-sm
                        font-semibold
                        transition-colors
                        duration-200
                        ${
                          active
                            ? 'text-[#06038D]'
                            : 'text-slate-600 hover:text-[#06038D]'
                        }
                      `}
                    >

                      {link.label}

                      {/* Active underline */}
                      {active && (
                        <span
                          className="
                            absolute
                            bottom-0
                            left-0
                            right-0
                            h-0.5
                          "
                          style={{
                            background:
                              'linear-gradient(to right, #06038D, #19AAED)',
                          }}
                        />
                      )}

                    </Link>

                  ) : (

                    <a
                      key={link.href}
                      href={link.href}
                      className="
                        relative
                        flex
                        h-[88px]
                        items-center
                        text-sm
                        font-semibold
                        text-slate-600
                        transition-colors
                        duration-200
                        hover:text-[#06038D]
                        group
                      "
                    >

                      {link.label}

                      {/* Hover underline */}
                      <span
                        className="
                          absolute
                          bottom-0
                          left-1/2
                          h-0.5
                          w-0
                          -translate-x-1/2
                          transition-all
                          duration-300
                          group-hover:w-full
                        "
                        style={{
                          background:
                            'linear-gradient(to right, #06038D, #19AAED)',
                        }}
                      />

                    </a>

                  );
                })}

              </div>

            </div>


            {/* =================================================
                DESKTOP CTA
            ================================================= */}

            <div className="hidden md:flex items-center">

              <Link href="/quiz">

                <button
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-lg
                    px-6
                    py-3
                    text-sm
                    font-bold
                    transition-all
                    duration-300
                  "
                  style={{
                    background: '#06038D',
                    color: '#FFFFFF',
                    boxShadow:
                      '0 4px 14px rgba(6,3,141,0.18)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#050276';
                    e.currentTarget.style.transform =
                      'translateY(-1px)';
                    e.currentTarget.style.boxShadow =
                      '0 6px 18px rgba(6,3,141,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#06038D';
                    e.currentTarget.style.transform =
                      'translateY(0)';
                    e.currentTarget.style.boxShadow =
                      '0 4px 14px rgba(6,3,141,0.18)';
                  }}
                >
                  {t.nav.startQuiz}
                </button>

              </Link>

            </div>


            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <div className="md:hidden">

              <button
                type="button"
                onClick={() =>
                  setMobileOpen((open) => !open)
                }
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={
                  mobileOpen
                    ? 'Close menu'
                    : 'Open menu'
                }
                className="
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-600
                  transition-colors
                  hover:bg-blue-50
                  hover:text-[#06038D]
                "
              >

                {/* Hamburger */}
                <Menu
                  size={24}
                  className={`
                    absolute
                    transition-all
                    duration-200
                    ${
                      mobileOpen
                        ? 'scale-75 rotate-90 opacity-0'
                        : 'scale-100 rotate-0 opacity-100'
                    }
                  `}
                />

                {/* Close */}
                <X
                  size={24}
                  className={`
                    absolute
                    transition-all
                    duration-200
                    ${
                      mobileOpen
                        ? 'scale-100 rotate-0 opacity-100'
                        : 'scale-75 -rotate-90 opacity-0'
                    }
                  `}
                />

              </button>

            </div>

          </div>


          {/* =================================================
              MOBILE MENU
          ================================================= */}

          <AnimatePresence>

            {mobileOpen && (

              <motion.div
                id="mobile-menu"
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: 'auto',
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.25,
                  ease: 'easeOut',
                }}
                className="
                  md:hidden
                  overflow-hidden
                  border-t
                  border-slate-100
                "
              >

                <div className="py-5">

                  <div className="flex flex-col gap-1">


                    {/* =================================================
                        MOBILE LINKS
                    ================================================= */}

                    {navLinks.map((link) => {

                      const active = isActive(
                        link.href,
                        link.type
                      );

                      if (link.type === 'route') {

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMobileMenu}
                            className={`
                              rounded-lg
                              px-4
                              py-3.5
                              text-base
                              font-semibold
                              transition-colors
                              ${
                                active
                                  ? 'bg-blue-50 text-[#06038D]'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#06038D]'
                              }
                            `}
                          >
                            {link.label}
                          </Link>
                        );

                      }

                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={closeMobileMenu}
                          className="
                            rounded-lg
                            px-4
                            py-3.5
                            text-base
                            font-semibold
                            text-slate-600
                            transition-colors
                            hover:bg-slate-50
                            hover:text-[#06038D]
                          "
                        >
                          {link.label}
                        </a>
                      );

                    })}


                    {/* =================================================
                        MOBILE CTA
                    ================================================= */}

                    <div className="mt-3 border-t border-slate-100 pt-4">

                      <Link
                        href="/quiz"
                        onClick={closeMobileMenu}
                      >

                        <button
                          className="
                            w-full
                            rounded-lg
                            px-5
                            py-3.5
                            text-sm
                            font-bold
                            text-white
                            transition-all
                            duration-300
                          "
                          style={{
                            background: '#06038D',
                          }}
                        >
                          {t.nav.startQuiz}
                        </button>

                      </Link>

                    </div>

                  </div>

                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </motion.nav>
    </>
  );
}
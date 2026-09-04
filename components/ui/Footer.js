'use client';

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from 'react-icons/fa';
import Image from 'next/image';
import AshokaChakra from './AshokaChakra';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#06038D] text-white">

      {/* =====================================================
          BACKGROUND EFFECTS
      ===================================================== */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(25,170,237,0.16),transparent_45%)]" />

      <div className="absolute -bottom-48 -left-48 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Ashoka Chakra */}
      <div className="absolute -right-24 -bottom-24 opacity-[0.08] pointer-events-none">
        <AshokaChakra size={360} opacity={1} />
      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-16 sm:py-20">

        <div className="grid gap-12 md:grid-cols-4 mb-14">


          {/* =================================================
              BRAND
          ================================================= */}

          <div>

            <div className="flex items-center gap-3 mb-5">

              <div className="flex h-14 w-14 items-center justify-center">
                <Image
                  src="/Congress_Seva_Dal_2.png"
                  alt="Hum Mein Hai Rajiv"
                  width={56}
                  height={56}
                  className="rounded-xl object-contain"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  Hum Mein Hai Rajiv
                </h3>

                <p className="text-[10px] uppercase tracking-[0.16em] text-white/50 mt-1">
                  A Tribute • A Legacy
                </p>
              </div>

            </div>


            <p className="text-sm leading-7 text-white/70">
              Hum Mein Hai Rajiv is an initiative celebrating
              the life, vision and legacy of Rajiv Gandhi and
              his contribution to India's journey.
            </p>


            <p className="text-sm leading-7 text-white/55 mt-4">
              An initiative by{' '}
              <strong className="text-white/80">
                Congress Seva Dal
              </strong>.
            </p>


            {/* Congress Seva Dal link */}

            <a
              href="https://www.congressevadal.in"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                mt-5
                text-sm
                font-semibold
                text-white/80
                transition-colors
                duration-300
                hover:text-[#19AAED]
              "
            >
              Visit Congress Seva Dal
              <span className="text-base">→</span>
            </a>

          </div>


          {/* =================================================
              EXPLORE
          ================================================= */}

          <div>

            <h4 className="
              mb-5
              text-sm
              font-bold
              uppercase
              tracking-[0.2em]
              text-white
            ">
              Explore
            </h4>


            <ul className="space-y-3 text-sm">

              <li>
                <a
                  href="/"
                  className="
                    text-white/70
                    transition-colors
                    duration-300
                    hover:text-[#19AAED]
                  "
                >
                  Home
                </a>
              </li>


              <li>
                <a
                  href="#about"
                  className="
                    text-white/70
                    transition-colors
                    duration-300
                    hover:text-[#19AAED]
                  "
                >
                  About
                </a>
              </li>


              <li>
                <a
                  href="/quiz"
                  className="
                    text-white/70
                    transition-colors
                    duration-300
                    hover:text-[#19AAED]
                  "
                >
                  Take the Quiz
                </a>
              </li>


              <li>
                <a
                  href="/leaderboard"
                  className="
                    text-white/70
                    transition-colors
                    duration-300
                    hover:text-[#19AAED]
                  "
                >
                  Champions
                </a>
              </li>

            </ul>

          </div>


          {/* =================================================
              CONNECT
          ================================================= */}

          <div>

            <h4 className="
              mb-5
              text-sm
              font-bold
              uppercase
              tracking-[0.2em]
              text-white
            ">
              Connect
            </h4>


            <p className="text-sm leading-7 text-white/70 mb-5">
              Stay connected with Congress Seva Dal for the
              latest initiatives, events and activities.
            </p>


            <a
              href="https://www.congressevadal.in"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-white/80
                transition-colors
                duration-300
                hover:text-[#19AAED]
              "
            >
              Congress Seva Dal
              <span>→</span>
            </a>

          </div>


          {/* =================================================
              FOLLOW US
          ================================================= */}

          <div>

            <h4 className="
              mb-5
              text-sm
              font-bold
              uppercase
              tracking-[0.2em]
              text-white
            ">
              Follow Us
            </h4>


            <p className="mb-6 text-sm leading-7 text-white/70">
              Follow Congress Seva Dal and stay updated with
              initiatives, events and youth engagement
              activities across India.
            </p>


            <div className="flex gap-3">


              {/* Facebook */}

              <a
                href="https://www.facebook.com/INCSevaDal/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-500
                  hover:bg-blue-600
                "
              >
                <FaFacebookF
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </a>


              {/* X / Twitter */}

              <a
                href="https://x.com/CongressSevadal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-black
                "
              >
                <FaTwitter
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </a>


              {/* Instagram */}

              <a
                href="https://www.instagram.com/congresssevadal_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-pink-500
                  hover:bg-gradient-to-br
                  hover:from-yellow-400
                  hover:via-pink-500
                  hover:to-purple-600
                "
              >
                <FaInstagram
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </a>


              {/* YouTube */}

              <a
                href="https://www.youtube.com/@AllIndiaCongressSevadal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-red-500
                  hover:bg-red-600
                "
              >
                <FaYoutube
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </a>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-4
            border-t
            border-white/10
            pt-8
            text-sm
            text-white/50
            sm:flex-row
          "
        >

          <p>
            © {new Date().getFullYear()} Hum Mein Hai Rajiv.
          </p>


          <div className="flex items-center gap-2">

            <span>
              An initiative by
            </span>

            <a
              href="https://www.congressevadal.in"
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-semibold
                text-white/70
                transition-colors
                duration-300
                hover:text-[#19AAED]
              "
            >
              Congress Seva Dal
            </a>

          </div>


          <p>
            All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AshokaChakra from '../../components/ui/AshokaChakra';
import { useLang } from '../../lib/LanguageContext';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import { ArrowLeft, Trophy, RefreshCw, MapPin, Clock } from 'lucide-react';

const RANK_STYLES = {
  1: { bg:'linear-gradient(135deg,#FFD700,#FFA500)', text:'#7a4a00', badge:'🥇' },
  2: { bg:'linear-gradient(135deg,#C0C0C0,#A8A8A8)', text:'#444',   badge:'🥈' },
  3: { bg:'linear-gradient(135deg,#CD7F32,#A0522D)', text:'#fff',   badge:'🥉' },
};

function RankBadge({ rank }) {
  const s = RANK_STYLES[rank];
  if (s) return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black shrink-0"
      style={{ background:s.bg, color:s.text, boxShadow:'0 2px 8px rgba(0,0,0,0.15)' }}>{s.badge}</div>
  );
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-sm"
      style={{ background:'rgba(6,3,141,0.08)', color:'#06038D' }}>{rank}</div>
  );
}

function ScorePill({ score, total }) {
  const pct   = Math.round((score/total)*100);
  const color = pct>=80?'#138808':pct>=50?'#06038D':'#ef4444';
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-black text-base" style={{ color }}>{score}</span>
      <span className="text-xs" style={{ color:'#8886C0' }}>/ {total}</span>
      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background:`${color}12`, color }}>{pct}%</span>
    </div>
  );
}

export default function LeaderboardPage() {
  const { t } = useLang();
  const lb = t.lb;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastRefresh, setLastRefresh] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leaderboard');

      if (!res.ok) {
        throw new Error('Failed to load leaderboard');
      }

      const json = await res.json();

      setData(json.leaderboard || []);
      setLastRefresh(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const rankLabels = [
    '',
    lb.champion,
    lb.runnerUp,
    lb.thirdPlace
  ];

  const rankBgColors = [
    '',
    '#FFB300',
    '#9E9E9E',
    '#A0522D'
  ];

  return (
    <>
      {/* Same Navbar as the main page */}
      <Navbar />

      <main
        className="min-h-screen relative overflow-hidden pt-20"
        style={{
          background:
            'linear-gradient(160deg,#EEF1FB 0%,#E8EEFF 50%,#F0F7FE 100%)'
        }}
      >
        {/* Background Ashoka Chakra */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none spin-slow opacity-60">
          <AshokaChakra size={700} opacity={0.04} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-20">

          {/* Header */}
          <div className="text-center mb-10 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6"
                style={{
                  background: 'rgba(25,170,237,0.10)',
                  border: '1px solid rgba(25,170,237,0.25)'
                }}
              >
                <Trophy
                  size={14}
                  style={{ color: '#19AAED' }}
                />

                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: '#0e8bc7' }}
                >
                  {lb.badge}
                </span>
              </div>

              <h1
                className="section-title text-4xl sm:text-5xl mb-3"
                style={{ color: '#0A0840' }}
              >
                {lb.title1}{' '}

                <span
                  style={{
                    background:
                      'linear-gradient(135deg,#06038D,#19AAED)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {lb.title2}
                </span>
              </h1>

              <p
                style={{
                  color: '#5B5A9A',
                  fontSize: '14px'
                }}
              >
                {lb.sub}
              </p>
            </motion.div>
          </div>

          {/* Refresh row */}
          <div className="flex items-center justify-between mb-6 px-1">
            <p
              style={{
                color: '#8886C0',
                fontSize: '12px'
              }}
            >
              {lastRefresh &&
                `Updated ${lastRefresh.toLocaleTimeString()}`}
            </p>

            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
              style={{
                background: 'rgba(6,3,141,0.08)',
                color: '#06038D',
                border: '1px solid rgba(6,3,141,0.15)'
              }}
            >
              <RefreshCw
                size={13}
                className={loading ? 'animate-spin' : ''}
              />

              {lb.refresh}
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl h-16 animate-pulse"
                  style={{
                    background: 'rgba(6,3,141,0.06)'
                  }}
                />
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-20">
              <p
                style={{
                  color: '#ef4444',
                  marginBottom: '12px'
                }}
              >
                {error}
              </p>

              <button
                onClick={fetchData}
                className="btn-primary text-sm px-6 py-3"
              >
                Retry
              </button>
            </div>
          )}

          {/* No data */}
          {!loading && !error && data.length === 0 && (
            <div
              className="text-center py-24 rounded-3xl shadow-blue"
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(6,3,141,0.08)'
              }}
            >
              <Trophy
                size={48}
                style={{
                  color: '#E2E7F8',
                  margin: '0 auto 16px'
                }}
              />

              <p
                style={{
                  color: '#5B5A9A',
                  fontWeight: '600'
                }}
              >
                {lb.noData}
              </p>

              <Link href="/quiz">
                <button className="btn-primary text-sm px-8 py-3 mt-6">
                  {lb.startQuiz}
                </button>
              </Link>
            </div>
          )}

          {/* Leaderboard */}
          {!loading && !error && data.length > 0 && (
            <div className="flex flex-col gap-2">

              {data.map((entry, i) => {
                const isTop3 = entry.rank <= 3;
                const isFirst =
                  i === 0 ||
                  data[i - 1].rank !== entry.rank;

                return (
                  <motion.div
                    key={`${entry.rank}-${entry.name}-${i}`}
                    initial={{
                      opacity: 0,
                      y: 12
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      delay: Math.min(i, 20) * 0.03
                    }}
                    className="rounded-2xl overflow-hidden"
                    style={
                      isTop3 && isFirst
                        ? {
                            boxShadow:
                              '0 4px 24px rgba(6,3,141,0.12)',
                            border: `1px solid ${
                              [
                                '',
                                '#FFD70030',
                                '#C0C0C030',
                                '#CD7F3230'
                              ][entry.rank]
                            }`
                          }
                        : {
                            border:
                              '1px solid rgba(6,3,141,0.07)'
                          }
                    }
                  >
                    {!isFirst && (
                      <div
                        style={{
                          height: '1px',
                          background:
                            'rgba(6,3,141,0.06)',
                          margin: '0 16px'
                        }}
                      />
                    )}

                    <div
                      className="flex items-center gap-4 px-4 py-4"
                      style={{
                        background: isTop3
                          ? 'rgba(255,255,255,0.95)'
                          : '#FFFFFF'
                      }}
                    >
                      <RankBadge rank={entry.rank} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="font-bold text-sm"
                            style={{
                              color: '#0A0840'
                            }}
                          >
                            {entry.name}
                          </span>

                          {isTop3 && entry.rank <= 3 && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-semibold text-white"
                              style={{
                                background:
                                  rankBgColors[entry.rank]
                              }}
                            >
                              {rankLabels[entry.rank]}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span
                            className="flex items-center gap-1 text-xs"
                            style={{
                              color: '#8886C0'
                            }}
                          >
                            <MapPin size={11} />
                            {entry.state}
                          </span>

                          {entry.timeTaken && (
                            <span
                              className="flex items-center gap-1 text-xs"
                              style={{
                                color: '#8886C0'
                              }}
                            >
                              <Clock size={11} />
                              {entry.timeTaken}s
                            </span>
                          )}
                        </div>
                      </div>

                      <ScorePill
                        score={entry.score}
                        total={entry.total}
                      />
                    </div>
                  </motion.div>
                );
              })}

              <p
                className="text-center text-xs mt-6"
                style={{
                  color: '#8886C0'
                }}
              >
                {lb.showing.replace(
                  '{n}',
                  data.length
                )}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Same Footer as the main page */}
      <Footer />
    </>
  );
}
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { quizQuestions, getRandomQuestions, QUESTION_DURATION } from '../../lib/questions';
import AshokaChakra from '../../components/ui/AshokaChakra';
import { useLang } from '../../lib/LanguageContext';
import {
  ArrowLeft, ChevronRight, AlertTriangle, Clock,
  CheckCircle2, XCircle, Trophy, Share2, RotateCcw,
  User, Phone, MapPin, Download, Loader2,
} from 'lucide-react';

const STAGES = { FORM: 'form', RULES: 'rules', QUIZ: 'quiz', RESULT: 'result' };
const STAGE_ORDER = ['form', 'rules', 'quiz', 'result'];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman & Nicobar Islands', 'Chandigarh', 'Dadra & Nagar Haveli',
  'Daman & Diu', 'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

function formatTime(s) {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
}

// Certificate helpers
async function generateCertificate(name) {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const templateImage = new Image();
    templateImage.crossOrigin = 'anonymous';
    return new Promise((resolve, reject) => {
      templateImage.onload = () => {
        canvas.width = templateImage.width;
        canvas.height = templateImage.height;
        ctx.drawImage(templateImage, 0, 0);
        ctx.fillStyle = '#06038D';
        ctx.font = 'bold 100px Arial';
        ctx.textAlign = 'center';
        const nameX = canvas.width / 2;
        const nameY = canvas.height * 0.46;
        ctx.fillText(name, nameX, nameY);
        canvas.toBlob((blob) => {
          if (blob) resolve(URL.createObjectURL(blob));
          else reject(new Error('Failed to create blob'));
        }, 'image/jpeg', 0.9);
      };
      templateImage.onerror = () => reject(new Error('Failed to load template'));
      templateImage.src = '/Certificate.png';
    });
  } catch { return null; }
}

function downloadCertificate(certUrl, userName) {
  if (!certUrl || !userName) return;
  const link = document.createElement('a');
  link.href = certUrl;
  link.download = `${userName}_Certificate.jpeg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Sub-components
function ScoreBar({ score, total }) {
  const pct = Math.round((score / total) * 100);
  const color = pct >= 80 ? '#138808' : pct >= 50 ? '#06038D' : '#ef4444';
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1" style={{ color: '#8886C0' }}>
        <span>Score</span><span>{pct}%</span>
      </div>
      <div className="progress-bar">
        <motion.div className="progress-fill" initial={{ width: 0 }}
          animate={{ width: `${pct}%` }} transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
          style={{ background: `linear-gradient(90deg,${color},${color}bb)` }} />
      </div>
    </div>
  );
}

function Field({ label, error, icon, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: '#2D2B7A' }}>
        {label} <span style={{ color: '#ef4444' }}>*</span>
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10" style={{ color: '#8886C0' }}>{icon}</div>
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertTriangle size={11} /> {error}</p>}
    </div>
  );
}

// Registration Form
function RegistrationForm({ onSubmit }) {
  const { t } = useLang();
  const q = t.quiz;
  const [form, setForm] = useState({ name: '', mobile: '', state: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = q.nameErr;
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = q.mobileErr;
    if (!form.state) e.state = q.stateErr;
    setErrors(e); return Object.keys(e).length === 0;
  };

  const inputStyle = (key) => ({
    width: '100%', background: '#FFFFFF', fontFamily: 'DM Sans,sans-serif',
    border: `2px solid ${errors[key] ? '#ef4444' : 'rgba(6,3,141,0.15)'}`,
    borderRadius: '12px', paddingLeft: '48px', paddingRight: '16px',
    paddingTop: '14px', paddingBottom: '14px',
    color: '#0A0840', fontSize: '14px', outline: 'none', transition: 'border-color 0.2s',
  });

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5 }} className="w-full max-w-lg mx-auto">
      <div className="text-center mb-10">
        <p className="section-label mb-3">{q.step1}</p>
        <h1 className="section-title text-3xl sm:text-4xl mb-3" style={{ color: '#0A0840' }}>
          {q.regTitle1}{' '}
          <span style={{ background: 'linear-gradient(135deg,#06038D,#19AAED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {q.regTitle2}
          </span>
        </h1>
        <p style={{ color: '#5B5A9A', fontSize: '14px' }}>{q.regSub}</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (validate()) onSubmit(form); }}
        className="rounded-3xl p-7 sm:p-9 flex flex-col gap-5 shadow-blue"
        style={{ background: '#FFFFFF', border: '1px solid rgba(6,3,141,0.10)' }}>
        <Field label={q.nameLabel} error={errors.name} icon={<User size={16} />}>
          <input type="text" value={form.name} placeholder={q.namePlaceholder}
            style={inputStyle('name')} onChange={e => setForm({ ...form, name: e.target.value })} />
        </Field>
        <Field label={q.mobileLabel} error={errors.mobile} icon={<Phone size={16} />}>
          <input type="tel" value={form.mobile} placeholder={q.mobilePlaceholder}
            style={inputStyle('mobile')} onChange={e => setForm({ ...form, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })} />
        </Field>
        <Field label={q.stateLabel} error={errors.state} icon={<MapPin size={16} />}>
          <select value={form.state}
            style={{ ...inputStyle('state'), appearance: 'none', cursor: 'pointer', color: form.state ? '#0A0840' : '#8886C0' }}
            onChange={e => setForm({ ...form, state: e.target.value })}>
            <option value="" disabled style={{ color: '#8886C0' }}>{q.statePlaceholder}</option>
            {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <button type="submit" className="btn-primary text-base py-4 mt-2 w-full">{q.continueBtn}</button>
      </form>
    </motion.div>
  );
}

// Rules Screen
function RulesScreen({ onStart }) {
  const { t } = useLang();
  const q = t.quiz;
  const rules = [
    { text: q.rule1, color: '#06038D', icon: <Clock size={16} /> },
    { text: q.rule2, color: '#ef4444', icon: <AlertTriangle size={16} /> },
    { text: q.rule3, color: '#19AAED', icon: <CheckCircle2 size={16} /> },
    { text: q.rule4, color: '#138808', icon: <User size={16} /> },
    { text: q.rule5, color: '#0e8bc7', icon: <XCircle size={16} /> },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5 }} className="w-full max-w-lg mx-auto">
      <div className="text-center mb-10">
        <p className="section-label mb-3">{q.step2}</p>
        <h2 className="section-title text-3xl sm:text-4xl mb-3" style={{ color: '#0A0840' }}>
          {q.rulesTitle1}{' '}
          <span style={{ background: 'linear-gradient(135deg,#ef4444,#06038D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {q.rulesTitle2}
          </span>
        </h2>
        <p style={{ color: '#5B5A9A', fontSize: '14px' }}>{q.rulesSub}</p>
      </div>
      <div className="rounded-3xl p-7 sm:p-9 flex flex-col gap-4 mb-6 shadow-blue"
        style={{ background: '#FFFFFF', border: '1px solid rgba(6,3,141,0.10)' }}>
        {rules.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 + 0.2 }}
            className="flex items-start gap-4 p-4 rounded-2xl"
            style={{ background: 'rgba(6,3,141,0.03)', border: '1px solid rgba(6,3,141,0.08)' }}>
            <div style={{ color: r.color, flexShrink: 0, marginTop: '1px' }}>{r.icon}</div>
            <p style={{ color: '#2D2B7A', fontSize: '14px', lineHeight: '1.6' }}>{r.text}</p>
          </motion.div>
        ))}
        <div className="rounded-2xl p-4 mt-2" style={{ background: 'rgba(25,170,237,0.06)', border: '1px solid rgba(25,170,237,0.18)' }}>
          <p style={{ color: '#5B5A9A', fontSize: '12px', textAlign: 'center', lineHeight: '1.6' }}>{q.rulesAgree}</p>
        </div>
      </div>
      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onStart}
        className="btn-primary text-base py-4 w-full">{q.startBtn}</motion.button>
    </motion.div>
  );
}

// Quiz Screen
function QuizScreen({ userInfo, sessionQuestions, onComplete }) {
  const { t } = useLang();
  const q = t.quiz;
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION);
  const [tabWarning, setTabWarning] = useState(false);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef(null);
  const warnRef = useRef(null);
  const answersRef = useRef({});
  const tabCountRef = useRef(0);
  const isUrgent = timeLeft <= 10;
  const curr = sessionQuestions[currentQ];
  const progress = ((currentQ + 1) / sessionQuestions.length) * 100;

  const submitQuiz = useCallback((timedOut = false) => {
    clearInterval(timerRef.current);
    const fa = answersRef.current;
    const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000);
    const score = sessionQuestions.reduce((a, q) => fa[q.id] === q.correct ? a + 1 : a, 0);
    const answersArr = sessionQuestions.map(q => ({
      questionId: q.id, question: q.question,
      selected: fa[q.id] !== undefined ? fa[q.id] : null,
      correct: q.correct, isCorrect: fa[q.id] === q.correct,
    }));
    onComplete({ score, total: sessionQuestions.length, answers: fa, answersArr, timedOut, timeTaken, userInfo });
  }, [onComplete, userInfo, sessionQuestions]);

  // Per-question countdown: resets every time the question changes (manually or automatically)
  useEffect(() => {
    setTimeLeft(QUESTION_DURATION);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          if (currentQ < sessionQuestions.length - 1) {
            setCurrentQ(c => c + 1);
          } else {
            submitQuiz(true);
          }
          return QUESTION_DURATION;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQ, sessionQuestions.length, submitQuiz]);

  useEffect(() => {
    const onBlur = () => {
      tabCountRef.current++;
      if (tabCountRef.current >= 2) { clearInterval(timerRef.current); submitQuiz(false); }
      else { setTabWarning(true); clearTimeout(warnRef.current); warnRef.current = setTimeout(() => setTabWarning(false), 4000); }
    };
    window.addEventListener('blur', onBlur);
    return () => { window.removeEventListener('blur', onBlur); clearTimeout(warnRef.current); };
  }, [submitQuiz]);

  const selectAnswer = (idx) => { const u = { ...answersRef.current, [curr.id]: idx }; answersRef.current = u; setAnswers(u); };
  const handleNext = () => { if (currentQ < sessionQuestions.length - 1) setCurrentQ(c => c + 1); else submitQuiz(false); };
  const isLast = currentQ === sessionQuestions.length - 1;
  const hasSelected = answers[curr.id] !== undefined;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl mx-auto">
      <AnimatePresence>
        {tabWarning && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl"
            style={{ background: 'rgba(239,68,68,0.95)', maxWidth: '90vw', boxShadow: '0 8px 32px rgba(239,68,68,0.3)' }}>
            <AlertTriangle size={18} className="text-white shrink-0" />
            <p style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>{q.tabWarn}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-8">
        <div>
          <p style={{ color: '#8886C0', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>
            {q.questionOf} {currentQ + 1} {q.of} {sessionQuestions.length}
          </p>
          <p style={{ color: '#06038D', fontSize: '12px', fontWeight: '600' }}>{curr.topic}</p>
        </div>
        <div className="flex items-center gap-2 px-5 py-3 rounded-2xl transition-all"
          style={isUrgent ? { background: 'rgba(239,68,68,0.08)', border: '2px solid rgba(239,68,68,0.3)' } : { background: 'rgba(6,3,141,0.06)', border: '2px solid rgba(6,3,141,0.15)' }}>
          <Clock size={16} style={{ color: isUrgent ? '#ef4444' : '#06038D' }} />
          <span style={{ fontFamily: 'DM Sans', fontWeight: '900', fontSize: '20px', color: isUrgent ? '#ef4444' : '#06038D' }}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="progress-bar mb-8">
        <motion.div className="progress-fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }} className="rounded-3xl p-7 sm:p-9 mb-6 shadow-blue"
          style={{ background: '#FFFFFF', border: '1px solid rgba(6,3,141,0.10)' }}>
          <h3 style={{ color: '#0A0840', fontSize: '19px', fontWeight: '600', lineHeight: '1.6', marginBottom: '28px', fontFamily: 'Playfair Display,serif' }}>
            {curr.question}
          </h3>
          <div className="flex flex-col gap-3">
            {curr.options.map((opt, idx) => {
              const sel = answers[curr.id] === idx;
              return (
                <motion.button key={idx} onClick={() => selectAnswer(idx)} whileTap={{ scale: 0.99 }}
                  className="option-btn" style={sel ? { borderColor: '#06038D', background: 'rgba(6,3,141,0.06)' } : {}}>
                  <div className="flex items-center gap-4">
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0, fontSize: '11px', fontWeight: '700', transition: 'all 0.2s',
                      background: sel ? '#06038D' : 'rgba(6,3,141,0.08)',
                      color: sel ? 'white' : '#5B5A9A',
                      border: sel ? '1px solid #06038D' : '1px solid rgba(6,3,141,0.15)',
                    }}>
                      {['A', 'B', 'C', 'D'][idx]}
                    </div>
                    <span style={{ color: '#0A0840' }}>{opt}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {sessionQuestions.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-300" style={{
              width: i === currentQ ? 24 : 8, height: 8,
              background: i < currentQ ? '#138808' : i === currentQ ? '#06038D' : answers[sessionQuestions[i].id] !== undefined ? 'rgba(25,170,237,0.5)' : 'rgba(6,3,141,0.15)',
            }} />
          ))}
        </div>
        <motion.button whileHover={{ scale: hasSelected ? 1.03 : 1 }} whileTap={{ scale: hasSelected ? 0.97 : 1 }}
          onClick={hasSelected ? handleNext : undefined}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '14px',
            padding: '12px 24px', borderRadius: '12px', transition: 'all 0.2s', fontFamily: 'DM Sans',
            background: hasSelected ? 'linear-gradient(135deg,#06038D,#0805b0)' : 'rgba(6,3,141,0.06)',
            color: hasSelected ? 'white' : '#8886C0', cursor: hasSelected ? 'pointer' : 'not-allowed',
            border: hasSelected ? 'none' : '1px solid rgba(6,3,141,0.12)',
            boxShadow: hasSelected ? '0 4px 16px rgba(6,3,141,0.25)' : 'none',
          }}>
          {isLast ? q.submitBtn : q.nextBtn}
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}

// Result Screen
function ResultScreen({ result, onRetry }) {
  const { t } = useLang();
  const q = t.quiz;
  const { score, total, answers, timedOut, userInfo, sessionQuestions, submitStatus } = result;
  const pct = Math.round((score / total) * 100);
  const level = pct >= 90 ? { label: q.level1, emoji: '🏆', color: '#06038D' }
    : pct >= 70 ? { label: q.level2, emoji: '✊', color: '#19AAED' }
      : pct >= 50 ? { label: q.level3, emoji: '📖', color: '#138808' }
        : { label: q.level4, emoji: '💪', color: '#5B5A9A' };

  // Certificate state
  const [certUrl, setCertUrl] = useState(null);
  const [certLoading, setCertLoading] = useState(false);
  const [certError, setCertError] = useState('');

  // Auto-generate certificate when result mounts
  useEffect(() => {
    setCertLoading(true);
    generateCertificate(userInfo.name)
      .then(url => { if (url) setCertUrl(url); else setCertError('Template not found'); })
      .catch(() => setCertError('Could not generate certificate'))
      .finally(() => setCertLoading(false));
  }, [userInfo.name]);

  const handleShare = () => {
    const text = q.shareText
      .replace('{score}', score).replace('{total}', total).replace('{pct}', pct)
      .replace('{url}', window.location.origin + '/quiz');
    if (navigator.share) navigator.share({ title: 'My Hum Mein Hai Rajiv Score', text });
    else { navigator.clipboard.writeText(text); alert('Result copied!'); }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }} className="w-full max-w-xl mx-auto">

      {/* Score card */}
      <div className="rounded-3xl p-8 sm:p-10 mb-6 text-center relative overflow-hidden shadow-blue"
        style={{ background: '#FFFFFF', border: `1px solid ${level.color}20` }}>
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ background: 'linear-gradient(90deg,#FF9933 33%,white 33%,white 66%,#138808 66%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%,${level.color}05,transparent 60%)` }} />
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
          style={{ background: `${level.color}10`, border: `2px solid ${level.color}20` }}>
          <Trophy size={34} style={{ color: level.color }} />
        </div>
        <p className="text-sm mb-2 relative z-10" style={{ color: '#5B5A9A' }}>
          {q.resultWelcome} <strong style={{ color: '#0A0840' }}>{userInfo.name}</strong>!
        </p>
        <h2 className="section-title text-5xl mb-2 relative z-10" style={{ color: '#0A0840' }}>
          {score}<span style={{ color: '#8886C0' }}>/{total}</span>
        </h2>
        <p className="font-bold text-base mb-6 relative z-10" style={{ color: level.color }}>
          {level.emoji} {level.label}
        </p>
        <div className="relative z-10"><ScoreBar score={score} total={total} /></div>

        {timedOut && <div className="mt-3 flex items-center gap-2 justify-center relative z-10" style={{ color: '#ef4444', fontSize: '12px' }}><Clock size={12} /> {q.timedOut}</div>}
        {submitStatus === 'saving' && <p className="mt-3 text-xs relative z-10" style={{ color: '#8886C0' }}>{q.scoreSaving}</p>}
        {submitStatus === 'saved' && <p className="mt-3 text-xs relative z-10" style={{ color: '#138808' }}>{q.scoreSaved}</p>}
        {submitStatus === 'error' && <p className="mt-3 text-xs relative z-10" style={{ color: '#ef4444' }}>{q.scoreError}</p>}
      </div>

      {/* Certificate section */}
      <div className="rounded-3xl p-6 mb-6 shadow-blue"
        style={{ background: '#FFFFFF', border: '1px solid rgba(6,3,141,0.10)' }}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-bold text-base" style={{ color: '#0A0840' }}>🏅 {q.certNote}</h3>
          </div>
          <motion.button
            whileHover={{ scale: certUrl ? 1.03 : 1 }}
            whileTap={{ scale: certUrl ? 0.97 : 1 }}
            onClick={() => downloadCertificate(certUrl, userInfo.name)}
            disabled={!certUrl || certLoading}
            className="flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl transition-all"
            style={{
              background: certUrl ? 'linear-gradient(135deg,#06038D,#0805b0)' : 'rgba(6,3,141,0.06)',
              color: certUrl ? 'white' : '#8886C0',
              cursor: certUrl ? 'pointer' : 'not-allowed',
              boxShadow: certUrl ? '0 4px 16px rgba(6,3,141,0.25)' : 'none',
              border: certUrl ? 'none' : '1px solid rgba(6,3,141,0.12)',
              minWidth: '160px', justifyContent: 'center',
            }}>
            {certLoading ? <><Loader2 size={15} className="animate-spin" />{q.certGenerating}</> : <><Download size={15} />{q.certBtn}</>}
          </motion.button>
        </div>
        {certError && <p className="text-xs mt-2" style={{ color: '#ef4444' }}>{certError}</p>}
      </div>

      {/* Answer review */}
      <div className="rounded-3xl p-6 sm:p-8 mb-6 shadow-blue"
        style={{ background: '#FFFFFF', border: '1px solid rgba(6,3,141,0.10)' }}>
        <h3 style={{ color: '#0A0840', fontWeight: '700', fontSize: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} style={{ color: '#138808' }} /> {q.answerReview}
        </h3>
        <div className="flex flex-col gap-3" style={{ maxHeight: '280px', overflowY: 'auto' }}>
          {sessionQuestions.map(ques => {
            const ua = answers[ques.id]; const ok = ua === ques.correct; const att = ua !== undefined;
            return (
              <div key={ques.id} className="flex items-start gap-3 p-3 rounded-xl"
                style={{ background: ok ? 'rgba(19,136,8,0.06)' : att ? 'rgba(239,68,68,0.05)' : 'rgba(6,3,141,0.03)' }}>
                <div style={{ flexShrink: 0, marginTop: '2px' }}>
                  {ok ? <CheckCircle2 size={16} style={{ color: '#138808' }} /> : <XCircle size={16} style={{ color: att ? '#ef4444' : '#ccc' }} />}
                </div>
                <div>
                  <p style={{ color: '#2D2B7A', fontSize: '12px', lineHeight: '1.5', marginBottom: '2px' }}>{ques.question}</p>
                  {!ok && <p style={{ color: '#138808', fontSize: '12px' }}>{q.correct} {ques.options[ques.correct]}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleShare}
          className="btn-primary text-sm py-4 flex-1 flex items-center justify-center gap-2">
          <Share2 size={16} /> {q.shareBtn}
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onRetry}
          className="btn-secondary text-sm py-4 flex-1 flex items-center justify-center gap-2">
          <RotateCcw size={16} /> {q.retryBtn}
        </motion.button>
      </div>
      <div className="flex justify-center gap-6">
        <Link href="/leaderboard" style={{ color: '#06038D', fontSize: '14px', fontWeight: '600' }}>{q.viewLeaderboard}</Link>
        <Link href="/" style={{ color: '#8886C0', fontSize: '14px' }}>{q.backHome}</Link>
      </div>
    </motion.div>
  );
}

// Main Page
export default function QuizPage() {
  const { t } = useLang();
  const q = t.quiz;
  const [stage, setStage] = useState(STAGES.FORM);
  const [userInfo, setUserInfo] = useState(null);
  const [result, setResult] = useState(null);
  const [sessionQuestions, setSessionQuestions] = useState([]);

  const handleStartQuiz = () => {
    setSessionQuestions(getRandomQuestions(quizQuestions));
    setStage(STAGES.QUIZ);
  };

  const handleQuizComplete = async (res) => {
    const formattedQuestions = sessionQuestions.map((q) => ({ ...q }));
    setResult({ ...res, sessionQuestions: formattedQuestions, submitStatus: 'saving' });
    setStage(STAGES.RESULT);
    try {
      const payload = {
        name: res.userInfo.name, mobile: res.userInfo.mobile, state: res.userInfo.state,
        score: res.score, total: res.total, timeTaken: res.timeTaken, timedOut: res.timedOut, answers: res.answersArr
      };
      const r = await fetch('/api/quiz', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      setResult(prev => ({ ...prev, submitStatus: r.ok ? 'saved' : 'error' }));
    } catch {
      setResult(prev => ({ ...prev, submitStatus: 'error' }));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#EEF1FB 0%,#E8EEFF 50%,#F0F7FE 100%)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none spin-slow">
        <AshokaChakra size={600} opacity={0.05} />
      </div>
      <div className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '300px', background: 'radial-gradient(ellipse at 50% 0%,rgba(25,170,237,0.10) 0%,transparent 70%)' }} />

      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-sm" style={{ color: '#5B5A9A' }}>
          <ArrowLeft size={16} /> <span className="hidden sm:inline">{q.backToHome}</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <img src='/Congress_Seva_Dal_2.png' alt='logo' className='rounded-lg' />
          </div>
          <span style={{ color: '#06038D', fontSize: '14px', fontWeight: '700' }}>HMHR</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {['form', 'rules', 'quiz'].map(s => {
              const ci = STAGE_ORDER.indexOf(stage), ti = STAGE_ORDER.indexOf(s);
              return <div key={s} className="rounded-full transition-all duration-300" style={{
                width: stage === s ? 20 : 8, height: 8,
                background: ci > ti ? '#138808' : stage === s ? '#06038D' : 'rgba(6,3,141,0.20)',
              }} />;
            })}
          </div>
        </div>
      </nav>

      <div className="relative z-10 px-4 sm:px-6 pb-20 pt-4">
        <AnimatePresence mode="wait">
          {stage === STAGES.FORM && <motion.div key="form"><RegistrationForm onSubmit={i => { setUserInfo(i); setStage(STAGES.RULES); }} /></motion.div>}
          {stage === STAGES.RULES && <motion.div key="rules"><RulesScreen onStart={handleStartQuiz} /></motion.div>}
          {stage === STAGES.QUIZ && <motion.div key="quiz"><QuizScreen userInfo={userInfo} sessionQuestions={sessionQuestions} onComplete={handleQuizComplete} /></motion.div>}
          {stage === STAGES.RESULT && console.log(result,)}
          {stage === STAGES.RESULT && <motion.div key="result"><ResultScreen result={result} onRetry={() => { setResult(null); setStage(STAGES.FORM); }} /></motion.div>}
        </AnimatePresence>
      </div>

      <div className="relative z-10 text-center pb-8 px-4">
        <div className="tricolor-line w-32 mx-auto mb-4" />
        <p style={{ color: '#8886C0', fontSize: '12px' }}>{t.footer.initiative}</p>
      </div>
    </div>
  );
}

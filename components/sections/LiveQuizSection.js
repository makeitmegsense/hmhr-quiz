'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import AshokaChakra from '../ui/AshokaChakra';

const gradientText = {
  background: 'linear-gradient(135deg,#06038D,#19AAED)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  paddingTop: '4px',
  paddingBottom: '4px',
};

const inputBase = {
  background: '#FFFFFF',
  border: '1.5px solid rgba(6,3,141,0.12)',
  borderRadius: '12px',
  padding: '12px 16px',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '15px',
  color: '#0A0840',
  width: '100%',
  outline: 'none',
  transition: 'all 0.2s ease',
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.3px',
  marginBottom: '6px',
  color: '#2D2B7A',
};

const referralOptions = [
  'Social Media',
  'Digital News platforms',
  'Word of Mouth',
  'Whatsapp',
  'Others',
];

const youAreOptions = [
  { value: 'school student', label: 'School Student' },
  { value: 'undergrad', label: 'Undergraduate' },
  { value: 'post-grad', label: 'Post-graduate' },
  { value: 'NA', label: 'N/A' },
];

const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

export default function LiveQuizSection() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    youAre: '',
    city: '',
    state: '',
    institution: '',
    class: '',
    course: '',
    contact: '',
    parentName: '',
    parentContact: '',
    referral: '',
    referralOther: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    const ageNum = Number(form.age);
    if (!form.age || Number.isNaN(ageNum)) e.age = 'Age is required';
    else if (ageNum < 16 || ageNum > 26) e.age = 'Age must be between 16 and 26';
    if (!form.gender) e.gender = 'Please select a gender';
    if (!form.youAre) e.youAre = 'Please select an option';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state.trim()) e.state = 'State is required';
    if (!form.institution.trim()) e.institution = 'Institution is required';
    if (form.youAre === 'school student' && !form.class.trim()) e.class = 'Class is required for school students';
    if ((form.youAre === 'undergrad' || form.youAre === 'post-grad') && !form.course.trim()) {
      e.course = 'Course is required for college students';
    }
    if (!form.contact.trim()) e.contact = 'Contact is required';
    else if (!/^\d{10}$/.test(form.contact.trim())) e.contact = 'Enter a valid 10-digit number';
    if (!form.parentName.trim()) e.parentName = "Parent's name is required";
    if (!form.parentContact.trim()) e.parentContact = "Parent's contact is required";
    else if (!/^\d{10}$/.test(form.parentContact.trim())) e.parentContact = 'Enter a valid 10-digit number';
    if (!form.referral) e.referral = 'Please choose an option';
    if (form.referral === 'Others' && !form.referralOther.trim()) e.referralOther = 'Please specify';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus('submitting');
    setErrMsg('');

    const payload = {
      name: form.name.trim(),
      age: Number(form.age),
      gender: form.gender,
      youAre: form.youAre,
      city: form.city.trim(),
      state: form.state.trim(),
      institution: form.institution.trim(),
      class: form.youAre === 'school student' ? form.class.trim() : null,
      course: form.youAre === 'undergrad' || form.youAre === 'post-grad' ? form.course.trim() : null,
      contact: form.contact.trim(),
      parentName: form.parentName.trim(),
      parentContact: form.parentContact.trim(),
      referralSource: form.referral === 'Others' ? `Others: ${form.referralOther.trim()}` : form.referral,
    };

    try {
      const res = await fetch('https://api.shaktiabhiyan.in/api/v1/sevadal/enthusiasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      setStatus('success');
      setForm({
        name: '', age: '', gender: '', youAre: '', city: '', state: '',
        institution: '', class: '', course: '', contact: '',
        parentName: '', parentContact: '', referral: '', referralOther: '',
      });
    } catch (err) {
      setStatus('error');
      setErrMsg('Registration could not be submitted right now. Please try again later.');
    }
  };

  const showClass = form.youAre === 'school student';
  const showCourse = form.youAre === 'undergrad' || form.youAre === 'post-grad';

  return (
    <section id="live-quiz" className="relative py-28 overflow-hidden section-blue-tint">
      <div className="absolute -top-24 -left-16 pointer-events-none hidden lg:block">
        <AshokaChakra size={320} opacity={0.06} />
      </div>
      <div className="absolute -bottom-24 -right-16 pointer-events-none hidden lg:block">
        <AshokaChakra size={300} opacity={0.05} />
      </div>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(25,170,237,0.4),transparent)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-6"
              style={{ background: 'rgba(255,153,51,0.10)', border: '1px solid rgba(255,153,51,0.35)' }}
            >
              <Sparkles size={14} style={{ color: '#e07a1e' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#c9620f' }}>
                Live Event • June 2026
              </span>
            </div>
            <h2 className="section-title text-4xl sm:text-5xl lg:text-6xl mb-4" style={{ color: '#0A0840' }}>
              Live <span style={gradientText}>Hum Mein Hai Rajiv</span>
            </h2>
            <div className="tricolor-line w-32 mx-auto mb-6" />
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: '#5B5A9A' }}>
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} style={{ color: '#06038D' }} />
                Jaipur, Rajasthan
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar size={16} style={{ color: '#19AAED' }} />
                June 2026
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            className="rounded-3xl p-8 sm:p-10 mb-10 relative overflow-hidden shadow-blue"
            style={{ background: '#FFFFFF', border: '1px solid rgba(6,3,141,0.10)' }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: 'linear-gradient(90deg,#FF9933 33%,white 33%,white 66%,#138808 66%)' }}
            />
            <p className="text-base sm:text-lg leading-relaxed mb-4" style={{ color: '#2D2B7A' }}>
              <strong style={{ color: '#06038D' }}>Hello Seva Dal Volunteers,</strong>
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#2D2B7A' }}>
              This <strong>June</strong>, we are going to conduct our first live quiz in{' '}
              <strong>Jaipur, Rajasthan</strong>. Come join us for a day to celebrate the knowledge around
              the formation, conservation, and protection of our Constitution.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#5B5A9A' }}>
              Register below and follow this space for more updates.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div
            className="rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-blue"
            style={{ background: '#FFFFFF', border: '1px solid rgba(6,3,141,0.10)' }}
          >
            <div className="mb-8">
              <p className="section-label mb-2">Registration Form</p>
              <h3 className="section-title text-2xl sm:text-3xl" style={{ color: '#0A0840' }}>
                Reserve your <span style={gradientText}>spot</span>
              </h3>
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-8 text-center"
                style={{ background: 'rgba(19,136,8,0.06)', border: '1px solid rgba(19,136,8,0.25)' }}
              >
                <CheckCircle2 size={48} style={{ color: '#138808', margin: '0 auto 16px' }} />
                <h4 className="text-xl font-bold mb-2" style={{ color: '#0A0840' }}>
                  You&apos;re registered!
                </h4>
                <p className="text-sm" style={{ color: '#2D2B7A' }}>
                  Thank you for signing up. We&apos;ll be in touch with the event details soon.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary text-sm mt-6"
                >
                  Submit another registration
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <Field label="Full Name" error={errors.name}>
                    <input
                      type="text"
                      style={inputBase}
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Enter your full name"
                    />
                  </Field>

                  {/* Age */}
                  <Field label="Age (16–26 only)" error={errors.age}>
                    <input
                      type="number"
                      min={16}
                      max={26}
                      style={inputBase}
                      value={form.age}
                      onChange={update('age')}
                      placeholder="e.g. 21"
                    />
                  </Field>

                  {/* Gender */}
                  <Field label="Gender" error={errors.gender}>
                    <select style={inputBase} value={form.gender} onChange={update('gender')}>
                      <option value="">Select…</option>
                      {genderOptions.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </Field>

                  {/* You are a */}
                  <Field label="You are a" error={errors.youAre}>
                    <select style={inputBase} value={form.youAre} onChange={update('youAre')}>
                      <option value="">Select…</option>
                      {youAreOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </Field>

                  {/* City */}
                  <Field label="City" error={errors.city}>
                    <input
                      type="text"
                      style={inputBase}
                      value={form.city}
                      onChange={update('city')}
                      placeholder="City"
                    />
                  </Field>

                  {/* State */}
                  <Field label="State" error={errors.state}>
                    <input
                      type="text"
                      style={inputBase}
                      value={form.state}
                      onChange={update('state')}
                      placeholder="State"
                    />
                  </Field>

                  {/* Institution */}
                  <Field label="Institution (School / College)" error={errors.institution} fullWidth>
                    <input
                      type="text"
                      style={inputBase}
                      value={form.institution}
                      onChange={update('institution')}
                      placeholder="Name of your school or college"
                    />
                  </Field>

                  {/* Class (school only) */}
                  {showClass && (
                    <Field label="Class" error={errors.class}>
                      <input
                        type="text"
                        style={inputBase}
                        value={form.class}
                        onChange={update('class')}
                        placeholder="e.g. 11th, 12th"
                      />
                    </Field>
                  )}

                  {/* Course (college only) */}
                  {showCourse && (
                    <Field label="Course" error={errors.course}>
                      <input
                        type="text"
                        style={inputBase}
                        value={form.course}
                        onChange={update('course')}
                        placeholder="e.g. B.A. Political Science"
                      />
                    </Field>
                  )}

                  {/* Contact */}
                  <Field label="Contact Number" error={errors.contact}>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      style={inputBase}
                      value={form.contact}
                      onChange={update('contact')}
                      placeholder="10-digit mobile number"
                    />
                  </Field>

                  {/* Parent name */}
                  <Field label="Parent's Name" error={errors.parentName}>
                    <input
                      type="text"
                      style={inputBase}
                      value={form.parentName}
                      onChange={update('parentName')}
                      placeholder="Parent's full name"
                    />
                  </Field>

                  {/* Parent contact */}
                  <Field label="Parent's Contact" error={errors.parentContact}>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      style={inputBase}
                      value={form.parentContact}
                      onChange={update('parentContact')}
                      placeholder="10-digit mobile number"
                    />
                  </Field>

                  {/* Referral */}
                  <Field label="How did you get to know about this event?" error={errors.referral} fullWidth>
                    <select style={inputBase} value={form.referral} onChange={update('referral')}>
                      <option value="">Select…</option>
                      {referralOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </Field>

                  {form.referral === 'Others' && (
                    <Field label="Please mention" error={errors.referralOther} fullWidth>
                      <input
                        type="text"
                        style={inputBase}
                        value={form.referralOther}
                        onChange={update('referralOther')}
                        placeholder="Tell us how you heard about us"
                      />
                    </Field>
                  )}
                </div>

                {status === 'error' && errMsg && (
                  <div
                    className="mt-6 rounded-xl px-4 py-3 flex items-start gap-2"
                    style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)' }}
                  >
                    <AlertCircle size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
                    <span className="text-sm" style={{ color: '#b91c1c' }}>{errMsg}</span>
                  </div>
                )}

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary text-base px-8 py-4 w-full sm:w-auto"
                    style={status === 'submitting' ? { opacity: 0.7, cursor: 'wait' } : {}}
                  >
                    {status === 'submitting' ? 'Submitting…' : 'Register for the Live Quiz →'}
                  </button>
                  <p className="text-xs text-center sm:text-left" style={{ color: '#8886C0' }}>
                    Your details will only be used for this live quiz and Congress Seva Dal youth engagement.
                  </p>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Field({ label, error, fullWidth, children }) {
  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && (
        <p className="text-xs mt-1.5" style={{ color: '#ef4444' }}>
          {error}
        </p>
      )}
    </div>
  );
}

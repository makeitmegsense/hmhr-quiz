'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogIn, LogOut, Users, Trophy, Clock, BarChart2, Download,
  FileSpreadsheet, FileText, Search, ChevronUp, ChevronDown,
  ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight,
  RefreshCw, MapPin, Filter, X, TrendingUp, Award, AlertCircle,
  CheckCircle, Shield,
} from 'lucide-react';

// Helpers
const P = '#06038D';
const A = '#19AAED';
const G = '#138808';

function api(path, opts = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('tsq-admin-token') : '';
  return fetch(path, { ...opts, headers: { 'Content-Type':'application/json', Authorization:`Bearer ${token}`, ...(opts.headers||{}) } });
}

function fmtPct(n) { return `${n ?? 0}%`; }
function fmtTime(s) { if (!s) return '–'; const m=Math.floor(s/60); return m>0?`${m}m ${s%60}s`:`${s}s`; }
function fmtDate(d) { return d ? new Date(d).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '–'; }
function scoreColor(pct) { return pct >= 80 ? G : pct >= 50 ? P : '#ef4444'; }

// Login Page
function LoginPage({ onLogin }) {
  const [form,    setForm]    = useState({ username:'', password:'' });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const res  = await fetch('https://api.shaktiabhiyan.in/api/v1/admin/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); return; }
      localStorage.setItem('tsq-admin-token', data.token);
      onLogin(data.username);
    } catch { setError('Cannot reach server'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:'linear-gradient(135deg,#EEF1FB,#E8EEFF)' }}>
      <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
        className="w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background:`linear-gradient(135deg,${P},${A})` }}>
            <Shield size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-black" style={{ color:P, fontFamily:'Playfair Display,serif' }}>Admin Dashboard</h1>
          <p className="text-sm mt-1" style={{ color:'#5B5A9A' }}>Hum Mein Hai Rajiv — Congress Seva Dal</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl p-8 shadow-lg"
          style={{ background:'#FFFFFF', border:'1px solid rgba(6,3,141,0.10)' }}>
          <div className="flex flex-col gap-4">
            {['username','password'].map(field => (
              <div key={field}>
                <label className="block text-sm font-semibold mb-1.5" style={{ color:'#2D2B7A' }}>
                  {field === 'username' ? 'Username' : 'Password'}
                </label>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  value={form[field]}
                  onChange={e => setForm({...form,[field]:e.target.value})}
                  placeholder={field === 'username' ? 'admin' : '••••••••'}
                  required
                  style={{
                    width:'100%', border:'2px solid rgba(6,3,141,0.15)', borderRadius:'12px',
                    padding:'12px 16px', color:'#0A0840', fontSize:'14px', outline:'none',
                    fontFamily:'DM Sans,sans-serif', background:'#FAFBFF',
                  }}
                />
              </div>
            ))}

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl text-sm" style={{ background:'rgba(239,68,68,0.08)', color:'#ef4444' }}>
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="btn-primary text-base py-3.5 mt-2 flex items-center justify-center gap-2"
              style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <LogIn size={16} />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Stat Card
function StatCard({ icon:Icon, label, value, sub, color, delay = 0 }) {
  return (
    <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay }}
      className="rounded-2xl p-5 shadow-sm"
      style={{ background:'#FFFFFF', border:`1px solid ${color}18` }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background:`${color}12` }}>
          <Icon size={22} style={{ color }} />
        </div>
        {sub && <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background:`${color}10`, color }}>{sub}</span>}
      </div>
      <p className="text-2xl font-black mb-0.5" style={{ color:'#0A0840' }}>{value}</p>
      <p className="text-sm" style={{ color:'#8886C0' }}>{label}</p>
    </motion.div>
  );
}

// Mini Bar
function MiniBar({ label, count, max, color }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="text-xs font-medium w-14 text-right shrink-0" style={{ color:'#5B5A9A' }}>{label}</div>
      <div className="flex-1 h-2 rounded-full" style={{ background:'rgba(6,3,141,0.08)' }}>
        <motion.div className="h-2 rounded-full" style={{ background:color || P }}
          initial={{ width:0 }} animate={{ width:`${pct}%` }} transition={{ duration:0.8, ease:'easeOut' }} />
      </div>
      <div className="text-xs font-bold w-8" style={{ color:'#0A0840' }}>{count}</div>
    </div>
  );
}

// Score Distribution
function ScoreDist({ data }) {
  if (!data?.length) return null;
  const max = Math.max(...data.map(d => d.count), 1);
  const colors = ['#ef4444', A, P, G];
  return (
    <div className="rounded-2xl p-5 shadow-sm" style={{ background:'#FFFFFF', border:'1px solid rgba(6,3,141,0.08)' }}>
      <h3 className="font-bold text-sm mb-4" style={{ color:'#0A0840' }}>Score Distribution</h3>
      <div className="flex flex-col gap-1">
        {data.map((d,i) => <MiniBar key={d.label} label={d.label} count={d.count} max={max} color={colors[i]} />)}
      </div>
    </div>
  );
}

// Daily Chart
function DailyChart({ data }) {
  if (!data?.length) return null;
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div className="rounded-2xl p-5 shadow-sm" style={{ background:'#FFFFFF', border:'1px solid rgba(6,3,141,0.08)' }}>
      <h3 className="font-bold text-sm mb-4" style={{ color:'#0A0840' }}>Daily Submissions (14 days)</h3>
      <div className="flex items-end gap-1.5 h-28">
        {data.map(d => {
          const h = Math.max(8, (d.count / max) * 100);
          return (
            <div key={d._id} className="flex-1 flex flex-col items-center gap-1 group relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold px-1.5 py-0.5 rounded z-10"
                style={{ background:P, color:'#fff', whiteSpace:'nowrap' }}>{d.count}</div>
              <motion.div className="w-full rounded-t-md" style={{ background:`linear-gradient(to top,${P},${A})` }}
                initial={{ height:0 }} animate={{ height:`${h}%` }} transition={{ duration:0.6 }} />
              <span className="text-xs" style={{ color:'#8886C0', fontSize:'9px' }}>
                {d._id.slice(5)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// State Table
function StateTable({ data, onSelectState, activeState }) {
  if (!data?.length) return null;
  return (
    <div className="rounded-2xl shadow-sm overflow-hidden" style={{ border:'1px solid rgba(6,3,141,0.08)' }}>
      <div className="px-5 py-4 flex items-center justify-between"
        style={{ background:'#FFFFFF', borderBottom:'1px solid rgba(6,3,141,0.08)' }}>
        <h3 className="font-bold text-sm" style={{ color:'#0A0840' }}>State-wise Breakdown</h3>
        {activeState && (
          <button onClick={() => onSelectState('')}
            className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-full"
            style={{ background:'rgba(6,3,141,0.08)', color:P }}>
            <X size={11} /> Clear filter
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table style={{ width:'100%', borderCollapse:'collapse', background:'#FFFFFF' }}>
          <thead>
            <tr style={{ background:'rgba(6,3,141,0.04)', borderBottom:'2px solid rgba(6,3,141,0.10)' }}>
              {['State','Entries','Avg Score','Avg %','Top Score','Avg Time'].map(h => (
                <th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:'11px', fontWeight:700, color:'#5B5A9A', textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((s, i) => (
              <tr key={s.state}
                onClick={() => onSelectState(s.state === activeState ? '' : s.state)}
                style={{
                  background: s.state===activeState ? 'rgba(6,3,141,0.06)' : i%2===0?'#FFFFFF':'#F9FAFF',
                  cursor:'pointer', borderBottom:'1px solid rgba(6,3,141,0.05)',
                  transition:'background 0.15s',
                }}>
                <td style={{ padding:'10px 14px', fontSize:'13px', fontWeight:600, color:'#0A0840' }}>
                  <span className="flex items-center gap-1.5"><MapPin size={12} style={{ color:A }}/>{s.state}</span>
                </td>
                <td style={{ padding:'10px 14px', fontSize:'13px', color:'#2D2B7A', fontWeight:700 }}>{s.count}</td>
                <td style={{ padding:'10px 14px', fontSize:'13px', color:scoreColor(s.avgScore*10) }}>{s.avgScore}</td>
                <td style={{ padding:'10px 14px', fontSize:'13px', fontWeight:700, color:scoreColor(s.avgPct) }}>{fmtPct(s.avgPct)}</td>
                <td style={{ padding:'10px 14px', fontSize:'13px', color:G, fontWeight:700 }}>{s.topScore}/10</td>
                <td style={{ padding:'10px 14px', fontSize:'13px', color:'#5B5A9A' }}>{fmtTime(s.avgTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Submissions Table
function SubmissionsTable({ token, activeState, setActiveState }) {
  const [data,    setData]    = useState([]);
  const [meta,    setMeta]    = useState({ total:0, page:1, pages:1, limit:50 });
  const [loading, setLoading] = useState(false);
  const [search,  setSearch]  = useState('');
  const [page,    setPage]    = useState(1);
  const [limit,   setLimit]   = useState(50);
  const [sortBy,  setSortBy]  = useState('submittedAt');
  const [sortOrd, setSortOrd] = useState('desc');
  const debounceRef = useRef(null);

  const fetchData = useCallback(async (opts = {}) => {
    setLoading(true);
    const params = new URLSearchParams({
      page:      opts.page      ?? page,
      limit:     opts.limit     ?? limit,
      state:     opts.state     ?? activeState,
      search:    opts.search    ?? search,
      sortBy:    opts.sortBy    ?? sortBy,
      sortOrder: opts.sortOrder ?? sortOrd,
    });
    try {
      const res  = await api(`https://api.shaktiabhiyan.in/api/v1/admin/submissions?${params}`);
      const json = await res.json();
      if (json.success) { setData(json.data); setMeta(json.meta); }
    } finally { setLoading(false); }
  }, [page, limit, activeState, search, sortBy, sortOrd]);

  useEffect(() => { fetchData(); }, [page, limit, sortBy, sortOrd, activeState]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => { setPage(1); fetchData({ page:1, search }); }, 400);
  }, [search]);

  const handleSort = (col) => {
    if (sortBy === col) { const o = sortOrd==='desc'?'asc':'desc'; setSortOrd(o); fetchData({ sortOrder:o }); }
    else { setSortBy(col); setSortOrd('desc'); fetchData({ sortBy:col, sortOrder:'desc' }); }
  };

  const SortIcon = ({ col }) => {
    if (sortBy !== col) return <ChevronDown size={12} style={{ color:'#ccc' }} />;
    return sortOrd==='desc' ? <ChevronDown size={12} style={{ color:P }}/> : <ChevronUp size={12} style={{ color:P }}/>;
  };

  const cols = [
    { key:'name',        label:'Name',        sortable:true  },
    { key:'mobile',      label:'Mobile',      sortable:false },
    { key:'state',       label:'State',       sortable:false },
    { key:'score',       label:'Score',       sortable:true  },
    { key:'percentage',  label:'%',           sortable:true  },
    { key:'timeTaken',   label:'Time',        sortable:true  },
    { key:'submittedAt', label:'Submitted At',sortable:true  },
  ];

  const handleExport = async (type) => {
    const params = new URLSearchParams({ state:activeState, search });
    const res    = await api(`https://api.shaktiabhiyan.in/api/v1/admin/export/${type}?${params}`);
    const blob   = await res.blob();
    const url    = URL.createObjectURL(blob);
    const a      = document.createElement('a');
    a.href       = url;
    a.download   = `HMHR_Data_${Date.now()}.${type}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:'#8886C0' }} />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or mobile…"
            style={{ width:'100%', paddingLeft:'34px', paddingRight:'12px', paddingTop:'9px', paddingBottom:'9px',
              border:'1.5px solid rgba(6,3,141,0.15)', borderRadius:'10px', fontSize:'13px',
              color:'#0A0840', outline:'none', fontFamily:'DM Sans,sans-serif', background:'#FFFFFF' }} />
        </div>

        {/* State filter badge */}
        {activeState && (
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold"
            style={{ background:'rgba(6,3,141,0.08)', color:P, border:'1px solid rgba(6,3,141,0.15)' }}>
            <Filter size={11}/> {activeState}
            <button onClick={()=>setActiveState('')}><X size={11}/></button>
          </div>
        )}

        {/* Per-page */}
        <select value={limit} onChange={e=>{setLimit(+e.target.value); setPage(1);}}
          style={{ padding:'8px 12px', border:'1.5px solid rgba(6,3,141,0.15)', borderRadius:'10px',
            fontSize:'13px', color:'#0A0840', outline:'none', background:'#FFFFFF', cursor:'pointer' }}>
          {[25,50,100,200,500].map(n=><option key={n} value={n}>{n} rows</option>)}
        </select>

        {/* Refresh */}
        <button onClick={()=>fetchData()} className="p-2 rounded-xl transition-all"
          style={{ background:'rgba(6,3,141,0.06)', border:'1px solid rgba(6,3,141,0.12)', color:P }}>
          <RefreshCw size={15} className={loading?'animate-spin':''} />
        </button>

        {/* Export buttons */}
        <button onClick={()=>handleExport('xlsx')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
          style={{ background:'rgba(19,136,8,0.10)', color:'#138808', border:'1px solid rgba(19,136,8,0.20)' }}>
          <FileSpreadsheet size={14}/> XLSX
        </button>
        <button onClick={()=>handleExport('pdf')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
          style={{ background:'rgba(239,68,68,0.08)', color:'#ef4444', border:'1px solid rgba(239,68,68,0.20)' }}>
          <FileText size={14}/> PDF
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border:'1px solid rgba(6,3,141,0.08)' }}>
        <div className="overflow-x-auto">
          <table style={{ width:'100%', borderCollapse:'collapse', minWidth:'700px' }}>
            <thead>
              <tr style={{ background:`linear-gradient(135deg,${P},#0805b0)` }}>
                <th style={{ padding:'12px 14px', color:'#fff', fontSize:'11px', fontWeight:700, textAlign:'left', letterSpacing:'0.05em', textTransform:'uppercase' }}>#</th>
                {cols.map(c => (
                  <th key={c.key} onClick={c.sortable?()=>handleSort(c.key):undefined}
                    style={{ padding:'12px 14px', color:'#fff', fontSize:'11px', fontWeight:700, textAlign:'left',
                      cursor:c.sortable?'pointer':'default', letterSpacing:'0.05em', textTransform:'uppercase', whiteSpace:'nowrap' }}>
                    <div className="flex items-center gap-1">{c.label}{c.sortable&&<SortIcon col={c.key}/>}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={8} style={{ textAlign:'center', padding:'40px', color:'#8886C0' }}>
                  <RefreshCw size={20} className="animate-spin inline mr-2" /> Loading…
                </td></tr>
              )}
              {!loading && data.length === 0 && (
                <tr><td colSpan={8} style={{ textAlign:'center', padding:'40px', color:'#8886C0' }}>No records found</td></tr>
              )}
              {!loading && data.map((row, i) => (
                <tr key={row._id || i}
                  style={{ background:i%2===0?'#FFFFFF':'#F9FAFF', borderBottom:'1px solid rgba(6,3,141,0.05)', transition:'background 0.15s' }}>
                  <td style={{ padding:'11px 14px', fontSize:'12px', color:'#8886C0' }}>{(meta.page-1)*meta.limit+i+1}</td>
                  <td style={{ padding:'11px 14px', fontSize:'13px', fontWeight:600, color:'#0A0840', maxWidth:'160px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{row.name}</td>
                  <td style={{ padding:'11px 14px', fontSize:'12px', color:'#5B5A9A', fontFamily:'monospace' }}>{row.mobile}</td>
                  <td style={{ padding:'11px 14px', fontSize:'12px', color:'#2D2B7A' }}>
                    <span className="flex items-center gap-1"><MapPin size={10} style={{ color:A }}/>{row.state}</span>
                  </td>
                  <td style={{ padding:'11px 14px', fontSize:'13px', fontWeight:700, color:scoreColor(row.percentage) }}>
                    {row.score}/{row.total}
                  </td>
                  <td style={{ padding:'11px 14px' }}>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background:`${scoreColor(row.percentage)}12`, color:scoreColor(row.percentage) }}>
                      {fmtPct(row.percentage)}
                    </span>
                  </td>
                  <td style={{ padding:'11px 14px', fontSize:'12px', color:'#5B5A9A' }}>{fmtTime(row.timeTaken)}</td>
                  <td style={{ padding:'11px 14px', fontSize:'11px', color:'#8886C0', whiteSpace:'nowrap' }}>{fmtDate(row.submittedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3"
            style={{ background:'#FFFFFF', borderTop:'1px solid rgba(6,3,141,0.08)' }}>
            <p className="text-xs" style={{ color:'#8886C0' }}>
              Showing {(meta.page-1)*meta.limit+1}–{Math.min(meta.page*meta.limit,meta.total)} of {meta.total}
            </p>
            <div className="flex items-center gap-1">
              {[
                { icon:ChevronsLeft,  action:()=>setPage(1),            disabled:page<=1 },
                { icon:ChevronLeft,   action:()=>setPage(p=>p-1),       disabled:page<=1 },
                { icon:ChevronRight,  action:()=>setPage(p=>p+1),       disabled:page>=meta.pages },
                { icon:ChevronsRight, action:()=>setPage(meta.pages),   disabled:page>=meta.pages },
              ].map(({ icon:Icon, action, disabled }, i) => (
                <button key={i} onClick={action} disabled={disabled}
                  style={{ padding:'6px', borderRadius:'8px', color:disabled?'#ccc':P,
                    background:disabled?'transparent':'rgba(6,3,141,0.06)', cursor:disabled?'default':'pointer',
                    border:'1px solid', borderColor:disabled?'transparent':'rgba(6,3,141,0.12)' }}>
                  <Icon size={14}/>
                </button>
              ))}
              <span className="text-xs ml-2" style={{ color:'#5B5A9A' }}>Page {meta.page}/{meta.pages}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Dashboard
function Dashboard({ username, onLogout }) {
  const [stats,       setStats]       = useState(null);
  const [statsLoading,setStatsLoading] = useState(true);
  const [activeState, setActiveState] = useState('');
  const [activeTab,   setActiveTab]   = useState('overview'); // overview | data

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const res  = await api('https://api.shaktiabhiyan.in/api/v1/admin/stats');
      const json = await res.json();
      if (json.success) setStats(json.stats);
    } finally { setStatsLoading(false); }
  };

  useEffect(() => { fetchStats(); }, []);

  const s = stats;

  return (
    <div style={{ minHeight:'100vh', background:'#F0F2FA', fontFamily:'DM Sans,sans-serif' }}>
      {/* Top Nav */}
      <div style={{ background:`linear-gradient(135deg,${P},#0805b0)`, boxShadow:'0 2px 20px rgba(6,3,141,0.3)' }}>
        <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'0 24px' }}>
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                <img src="/logo.jpg" alt="HMHR" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
              <div>
                <div className="text-white font-black text-sm tracking-wider">HMHR ADMIN</div>
                <div className="text-white/50 text-xs hidden sm:block">Hum Mein Hai Rajiv</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Tabs */}
              <div className="hidden sm:flex rounded-xl overflow-hidden" style={{ border:'1px solid rgba(255,255,255,0.15)' }}>
                {['overview','data'].map(tab => (
                  <button key={tab} onClick={()=>setActiveTab(tab)}
                    className="px-4 py-2 text-xs font-bold capitalize transition-all"
                    style={{ background:activeTab===tab?'rgba(255,255,255,0.20)':'transparent', color:'white' }}>
                    {tab === 'overview' ? '📊 Overview' : '📋 All Data'}
                  </button>
                ))}
              </div>
              <div className="text-white/60 text-xs hidden sm:block">{username}</div>
              <button onClick={onLogout}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all"
                style={{ background:'rgba(255,255,255,0.12)', color:'white', border:'1px solid rgba(255,255,255,0.20)' }}>
                <LogOut size={13}/> Logout
              </button>
            </div>
          </div>
          {/* Mobile tabs */}
          <div className="sm:hidden flex gap-2 pb-3">
            {['overview','data'].map(tab => (
              <button key={tab} onClick={()=>setActiveTab(tab)}
                className="px-4 py-1.5 text-xs font-bold rounded-lg capitalize"
                style={{ background:activeTab===tab?'rgba(255,255,255,0.20)':'transparent', color:'white' }}>
                {tab === 'overview' ? '📊 Overview' : '📋 Data'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'24px' }}>
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard icon={Users}    label="Total Participants" value={s?.totalSubmissions ?? '–'} color={P}   delay={0}   />
              <StatCard icon={Trophy}   label="Avg Score"          value={s ? `${s.avgScore}/10` : '–'} color={A} delay={0.05}/>
              <StatCard icon={BarChart2}label="Avg Percentage"     value={s ? fmtPct(s.avgPct) : '–'} sub={s?.avgPct>=60?'Good':'Needs work'} color={scoreColor(s?.avgPct||0)} delay={0.1}/>
              <StatCard icon={Clock}    label="Avg Time Taken"     value={s ? fmtTime(s.avgTime) : '–'} color="#8886C0" delay={0.15}/>
            </div>

            {/* Top scorer */}
            {s?.topScore && (
              <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
                className="rounded-2xl p-5 mb-6 flex items-center gap-5 flex-wrap"
                style={{ background:'linear-gradient(135deg,rgba(6,3,141,0.05),rgba(25,170,237,0.05))', border:'1px solid rgba(6,3,141,0.12)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background:'rgba(212,175,55,0.15)' }}>
                  <Award size={24} style={{ color:'#D4AF37' }} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color:A }}>🏆 Top Scorer</div>
                  <div className="font-bold text-base" style={{ color:'#0A0840' }}>{s.topScore.name}</div>
                  <div className="text-xs" style={{ color:'#5B5A9A' }}>{s.topScore.state} · {s.topScore.score}/{s.topScore.total} · {fmtPct(s.topScore.percentage)}</div>
                </div>
              </motion.div>
            )}

            {/* Charts row */}
            <div className="grid lg:grid-cols-2 gap-4 mb-6">
              <ScoreDist data={s?.scoreDistribution} />
              <DailyChart data={s?.dailySubmissions} />
            </div>

            {/* State table */}
            {s?.stateBreakdown && (
              <div className="mb-6">
                <StateTable data={s.stateBreakdown} onSelectState={(st)=>{ setActiveState(st); setActiveTab('data'); }} activeState={activeState} />
              </div>
            )}

            {/* Recent submissions */}
            {s?.recentSubmissions?.length > 0 && (
              <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border:'1px solid rgba(6,3,141,0.08)' }}>
                <div className="px-5 py-4" style={{ background:'#FFFFFF', borderBottom:'1px solid rgba(6,3,141,0.08)' }}>
                  <h3 className="font-bold text-sm flex items-center gap-2" style={{ color:'#0A0840' }}>
                    <TrendingUp size={15} style={{ color:A }}/> Recent Submissions
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table style={{ width:'100%', borderCollapse:'collapse', background:'#FFFFFF' }}>
                    <thead>
                      <tr style={{ background:'rgba(6,3,141,0.04)', borderBottom:'1px solid rgba(6,3,141,0.08)' }}>
                        {['Name','State','Score','%','Time','Submitted'].map(h=>(
                          <th key={h} style={{ padding:'9px 14px', fontSize:'11px', fontWeight:700, color:'#5B5A9A', textAlign:'left', textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.recentSubmissions.map((r,i)=>(
                        <tr key={i} style={{ borderBottom:'1px solid rgba(6,3,141,0.05)', background:i%2===0?'#FFFFFF':'#F9FAFF' }}>
                          <td style={{ padding:'9px 14px', fontSize:'13px', fontWeight:600, color:'#0A0840' }}>{r.name}</td>
                          <td style={{ padding:'9px 14px', fontSize:'12px', color:'#5B5A9A' }}>{r.state}</td>
                          <td style={{ padding:'9px 14px', fontSize:'13px', fontWeight:700, color:scoreColor(r.percentage) }}>{r.score}/10</td>
                          <td style={{ padding:'9px 14px' }}>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{ background:`${scoreColor(r.percentage)}12`, color:scoreColor(r.percentage) }}>
                              {fmtPct(r.percentage)}
                            </span>
                          </td>
                          <td style={{ padding:'9px 14px', fontSize:'12px', color:'#8886C0' }}>{fmtTime(r.timeTaken)}</td>
                          <td style={{ padding:'9px 14px', fontSize:'11px', color:'#8886C0' }}>{fmtDate(r.submittedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* DATA TAB */}
        {activeTab === 'data' && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <h2 className="font-black text-lg" style={{ color:'#0A0840', fontFamily:'Playfair Display,serif' }}>All Submissions</h2>
                {activeState && <p className="text-sm" style={{ color:A }}>Filtered: {activeState}</p>}
              </div>
            </div>
            <SubmissionsTable activeState={activeState} setActiveState={setActiveState} />
          </div>
        )}
      </div>
    </div>
  );
}

// Root
export default function AdminPage() {
  const [authed,   setAuthed]   = useState(false);
  const [username, setUsername] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('tsq-admin-token');
    if (token) {
      // Quick verify
      fetch('https://api.shaktiabhiyan.in/api/v1/admin/stats', { headers:{ Authorization:`Bearer ${token}` } })
        .then(r => { if (r.ok) { setAuthed(true); setUsername(localStorage.getItem('tsq-admin-user')||'Admin'); } })
        .catch(()=>{})
        .finally(()=>setChecking(false));
    } else { setChecking(false); }
  }, []);

  const handleLogin = (uname) => {
    localStorage.setItem('tsq-admin-user', uname);
    setUsername(uname); setAuthed(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('tsq-admin-token');
    localStorage.removeItem('tsq-admin-user');
    setAuthed(false); setUsername('');
  };

  if (checking) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:'#EEF1FB' }}>
      <RefreshCw size={28} className="animate-spin" style={{ color:P }} />
    </div>
  );

  if (!authed) return <LoginPage onLogin={handleLogin} />;
  return <Dashboard username={username} onLogout={handleLogout} />;
}

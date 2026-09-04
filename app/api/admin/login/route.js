import { NextResponse } from 'next/server';
const API = 'https://api.shaktiabhiyan.in';
export async function POST(req) {
  try {
    const body = await req.json();
    const res  = await fetch(`${API}/api/v1/admin/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch { return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 }); }
}

import { NextResponse } from 'next/server';
const API = 'https://api.shaktiabhiyan.in';
export async function GET(req) {
  try {
    const auth   = req.headers.get('authorization') || '';
    const params = req.nextUrl.searchParams.toString();
    const res    = await fetch(`${API}/api/v1/admin/submissions?${params}`, { headers:{ authorization: auth } });
    const data   = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch { return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 }); }
}

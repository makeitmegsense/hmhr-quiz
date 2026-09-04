import { NextResponse } from 'next/server';
const API = 'https://api.shaktiabhiyan.in';
export async function GET(req) {
  try {
    const auth   = req.headers.get('authorization') || '';
    const params = new URL(req.url).searchParams;
    const type   = params.get('type') || 'xlsx';
    params.delete('type');
    const url = `${API}/api/v1/admin/export/${type}?${params.toString()}`;
    const res = await fetch(url, { headers:{ authorization: auth } });
    const buf = await res.arrayBuffer();
    const headers = new Headers();
    headers.set('Content-Type',        res.headers.get('Content-Type') || 'application/octet-stream');
    headers.set('Content-Disposition', res.headers.get('Content-Disposition') || 'attachment');
    return new NextResponse(buf, { status: 200, headers });
  } catch { return NextResponse.json({ error: 'Export failed' }, { status: 502 }); }
}

import { NextResponse } from 'next/server';

const API_BASE =  'https://api.shaktiabhiyan.in';

export async function POST(request) {
  try {
    const body = await request.json();
    const res = await fetch(`${API_BASE}/api/v1/sevadal/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Failed to reach backend' }, { status: 502 });
  }
}

import { NextResponse } from 'next/server';

const API_BASE = 'https://api.shaktiabhiyan.in';

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/api/quiz/leaderboard`, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Failed to reach backend' }, { status: 502 });
  }
}

// File: app/api/c/route.ts

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export const fetchCache = 'force-no-store';

import { neon, neonConfig } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

neonConfig.poolQueryViaFetch = true;

export async function POST(request: Request) {
  const { id, item } = await request.json();
  if (!id || !item || !process.env.DATABASE_URL) return NextResponse.json({}, { status: 400 });
  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`SELECT COUNT(*) from messages WHERE session_id = ${id}`;
  await sql`
    INSERT INTO messages (created_at, id, session_id, content_type, content_transcript, object, role, status, type)
    VALUES (${rows[0].count}, ${item.id}, ${id}, ${item.content[0].type}, ${item.content[0].transcript}, ${item.object}, ${item.role}, ${item.status}, ${item.type})
    ON CONFLICT DO NOTHING
  `;
  return NextResponse.json({});
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id');
  if (!id || !process.env.DATABASE_URL) return NextResponse.json([]);
  const sql = neon(process.env.DATABASE_URL);
  const rows = await sql`SELECT * from messages WHERE session_id = ${id}`;
  return NextResponse.json(rows);
}
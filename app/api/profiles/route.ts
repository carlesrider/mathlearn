import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data');
const filePath = path.join(dataPath, 'profiles.json');

async function ensureFile() {
  try {
    await fs.mkdir(dataPath, { recursive: true });
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify({ profiles: [] }, null, 2));
  }
}

export async function GET() {
  await ensureFile();
  const content = await fs.readFile(filePath, 'utf-8');
  return NextResponse.json(JSON.parse(content));
}

export async function POST(req: Request) {
  await ensureFile();
  const body = await req.json();
  const content = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(content);
  data.profiles.push(body);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ ok: true });
}

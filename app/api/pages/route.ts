import { NextResponse } from "next/server";
import { fetchPages, addPage } from '../../lib/data'

export async function GET() {
  const result = await fetchPages();
  return NextResponse.json(result, { status: 200 });
}

export async function POST(request: Request) {
  const page = await request.json();
  await addPage(page.Id, page.ParentPageId, page.Title, page.SpaceId, page.State);
  return NextResponse.json({ status: 200 });
}

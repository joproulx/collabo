import { NextResponse } from "next/server";
import { updatePage } from '../../../lib/data'


export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const pageId = (await params).slug
  const page = await request.json();
  await updatePage(pageId, page.title);
  return NextResponse.json({ status: 200 });
}

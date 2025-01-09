import { NextResponse } from "next/server";
import { movePage } from '../../lib/data'

export async function POST(request: Request) {
  const movePageRequest = await request.json();
  await movePage(movePageRequest.pageId, movePageRequest.newParentPageId, movePageRequest.newOrder);
  return NextResponse.json({ status: 200 });
}
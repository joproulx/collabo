import { NextResponse } from "next/server";
import { fetchPages } from '../../lib/data'


// To handle a GET request to /api
export async function GET() {
  const result = await fetchPages()
    // Do whatever you want
  return NextResponse.json(result, { status: 200 });
}

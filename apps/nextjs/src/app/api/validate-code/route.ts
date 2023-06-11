import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const req = await request.json()
  console.log(req, "res here")
  return NextResponse.json({ req })
}

export function GET() {
  return NextResponse.json({ hola: "ok" })
}

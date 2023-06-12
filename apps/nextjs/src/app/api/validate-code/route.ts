import { headers } from "next/headers"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

import { supabaseServer } from "~/lib/supabase-server"

export async function POST(request: Request) {
  const req = await request.json()
  const headersList = headers()
  const BearerToken = headersList.get("Authorization")

  if (
    BearerToken &&
    typeof BearerToken == "string" &&
    typeof req.inputCode == "string"
  ) {
    const {
      data: { user },
    } = await supabaseServer.auth.getUser(BearerToken)

    console.log(user, "user")

    if (user) {
      const salt = await bcrypt.genSalt(5)
      const hashedPassword = await bcrypt.hash(req?.inputCode, salt)

      const insertRes = await supabaseServer
        .from("codes")
        .insert([{ code: hashedPassword, user_id: user.id }])

      if (insertRes.error) {
        return NextResponse.json({ req }, { status: 500 })
      }

      return NextResponse.json(true, { status: 200 })
    }
  }

  return NextResponse.json({ req }, { status: 403 })
}

import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import bcrypt from "bcrypt"

import { env } from "~/env.mjs"

export async function POST(request: Request) {
  const req = await request.json()
  const headersList = headers()
  const BearerToken = headersList.get("Authorization")

  console.log(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY,
    "env",
    BearerToken,
  )

  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL || "",
    env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY || "",
    {
      global: { headers: { Authorization: `Bearer ${BearerToken}` } },
      auth: { persistSession: false },
    },
  )

  if (
    BearerToken &&
    typeof BearerToken == "string" &&
    typeof req.inputCode == "string"
  ) {
    const {
      data: { user },
    } = await supabase.auth.getUser(BearerToken)

    if (user) {
      const salt = await bcrypt.genSalt(5)
      const hashedPassword = await bcrypt.hash(req?.inputCode, salt)

      const insertRes = await supabase
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

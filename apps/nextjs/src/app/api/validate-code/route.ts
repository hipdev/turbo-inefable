import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
  const req = await request.json()
  const headersList = headers()
  const BearerToken = headersList.get("Authorization")

  const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_PUBLIC_KEY || "",
    {
      global: { headers: { Authorization: `Bearer ${BearerToken}` } },
      auth: { persistSession: false },
    },
  )

  if (
    BearerToken &&
    typeof BearerToken == "string" &&
    typeof req.value == "string"
  ) {
    const {
      data: { user },
    } = await supabase.auth.getUser(BearerToken)

    if (user) {
      const { data, error } = await supabase
        .from("codes")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (error) {
        return NextResponse.json({ req }, { status: 500 })
      }

      const isTheSame = await bcrypt.compare(req.value, data.code)

      return NextResponse.json({ isValid: isTheSame }, { status: 200 })
    }
  }

  return NextResponse.json({ req }, { status: 403 })
}

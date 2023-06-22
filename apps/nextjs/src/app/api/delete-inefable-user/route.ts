import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

import { env } from "~/env.mjs"

export async function POST() {
  const headersList = headers()
  const BearerToken = headersList.get("Authorization")

  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL || "",
    env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY || "",
    {
      global: { headers: { Authorization: `Bearer ${BearerToken}` } },
      auth: { persistSession: false },
    },
  )

  const supabaseServer = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL || "",
    env.SUPABASE_SERVICE_ROLE || "",
  )

  if (BearerToken && typeof BearerToken == "string") {
    const {
      data: { user },
    } = await supabase.auth.getUser(BearerToken)

    if (user) {
      const deleteUser = await supabaseServer.auth.admin.deleteUser(user.id)

      console.log(deleteUser)

      if (deleteUser.error) {
        return NextResponse.json({ error: deleteUser.error }, { status: 500 })
      }

      return NextResponse.json({ ok: true }, { status: 200 })
    }
  }

  return NextResponse.json({ ok: false }, { status: 403 })
}

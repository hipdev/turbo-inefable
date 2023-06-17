import type { User } from "@supabase/supabase-js"

import supabase from "../client"

export async function getUserCode([_key, user_id]: [string, string]) {
  try {
    const { data, error } = await supabase
      .from("codes")
      .select("*")
      .eq("user_id", user_id)
      .limit(1)

    console.log(data, "data code", error)

    if (error) {
      return { error, ok: false }
    }

    return { ok: true, data }
  } catch (error) {
    return { error }
  }
}

// Mutations

export async function updateUserName({
  name,
  user,
}: {
  name: string
  user: User
}) {
  try {
    const { error } = await supabase.auth.updateUser({
      data: { name },
    })

    if (!error) {
      const { error } = await supabase
        .from("profiles")
        .upsert({ user_id: user.id, name }, { onConflict: "user_id" })

      if (error) {
        return { error, ok: false }
      }
    }

    if (error) {
      return { error, ok: false }
    }
    return { ok: true }
  } catch (error) {
    return { error }
  }
}

export async function deleteUserCode({ user_id }: { user_id: string }) {
  try {
    const { error } = await supabase
      .from("codes")
      .delete()
      .eq("user_id", user_id)

    if (error) {
      return { error, ok: false }
    }

    return { ok: true }
  } catch (error) {
    return { error }
  }
}

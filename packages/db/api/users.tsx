import supabase from "../client"

export async function updateUserName({ name, user }) {
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

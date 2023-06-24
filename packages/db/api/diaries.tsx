import { format } from "date-fns"

import supabase from "../client"

export async function getToday([_key, user_id]: [string, string]) {
  const currentDate = new Date()
  const today = format(currentDate, "yyyy-MM-dd")

  const { data } = await supabase
    .from("diaries")
    .select("*")
    .eq("user_id_date", `${user_id}--${today}`)
    .single()

  return data
}

export async function getDiaries([_key, user_id]: [string, string]) {
  const { data } = await supabase
    .from("diaries")
    .select("date, created_at, diary, id, title")
    .eq("user_id", user_id)
    .order("date", { ascending: false })

  return data
}

// Mutations
export async function createDiary({
  isTitle,
  formData,
  user_id,
}: {
  isTitle: boolean
  formData: string
  user_id: string | undefined
}) {
  const currentDate = new Date()
  const today = format(currentDate, "yyyy-MM-dd")

  const commonData = {
    user_id,
    user_id_date: `${user_id}--${today}`,
    date: today,
  }

  try {
    const { error } = await supabase
      .from("diaries")
      .insert(
        isTitle
          ? { ...commonData, title: formData }
          : { ...commonData, diary: formData },
      )

    if (error) {
      return { error }
    }
    return { ok: true }
  } catch (error) {
    return { error }
  }
}

export async function updateDiary({
  isTitle,
  formData,
  diary_id,
}: {
  isTitle: boolean
  formData: string
  diary_id: string
}) {
  try {
    const { error } = await supabase
      .from("diaries")
      .update(
        isTitle
          ? { updated_at: new Date(), title: formData }
          : { updated_at: new Date(), diary: formData },
      )
      .eq("id", diary_id)

    if (error) {
      return { error }
    }
    return { ok: true }
  } catch (error) {
    return { error }
  }
}

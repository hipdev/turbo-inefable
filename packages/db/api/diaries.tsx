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

export function getDiaryPicture([_key, picture_path]: [string, string]) {
  console.log(picture_path, "picture_path")
  const { data } = supabase.storage
    .from("cdn-inefable")
    .getPublicUrl(picture_path)

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

export async function saveDiaryPicture({
  user_id,
  formData,
  diary_id,
}: {
  user_id: string
  formData: FormData
  diary_id: string
}) {
  try {
    const { data, error } = await supabase.storage
      .from("cdn-inefable")
      .upload(`${user_id}/${diary_id}`, formData, { upsert: true })

    if (error) {
      return { error }
    }

    // Flag the picture in the diary
    const { error: errorUpdate } = await supabase
      .from("diaries")
      .update({ has_picture: true })
      .eq("id", diary_id)

    if (errorUpdate) {
      return { error }
    }

    return { data }
  } catch (error) {
    return { error }
  }
}

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

export async function getDiary([_key, diary_id]: [string, string]) {
  const { data } = await supabase
    .from("diaries")
    .select("*")
    .eq("id", diary_id)
    .single()

  return data
}

export async function getDiaries([_key, user_id]: [string, string]) {
  const { data } = await supabase
    .from("diaries")
    .select("date, created_at, diary, id, title, picture_id")
    .eq("user_id", user_id)
    .order("date", { ascending: false })

  return data
}

export function getDiaryPicture([_key, picture_path]: [string, string]) {
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
    // First check if there is a picture already
    const { data: checkPicture, error: errorCheck } = await supabase
      .from("diaries")
      .select("picture_id")
      .eq("id", diary_id)
      .single()

    if (errorCheck) {
      return { error: errorCheck }
    }

    // If there is a picture, we delete it
    if (checkPicture?.picture_id) {
      const { data, error } = await supabase.storage
        .from("cdn-inefable")
        .remove([`${checkPicture.picture_id}`])

      if (error) {
        return { error }
      }
    }

    const picturePath = `${user_id}/${diary_id}-${new Date().getTime()}`

    // Then we upload the new picture
    const { data, error } = await supabase.storage
      .from("cdn-inefable")
      .upload(picturePath, formData, { upsert: true })

    if (error) {
      return { error }
    }

    // Save the picture id in the diary
    const { data: dataPicture, error: errorUpdate } = await supabase
      .from("diaries")
      .update({ picture_id: data.path })
      .eq("id", diary_id)

    if (errorUpdate) {
      return { error }
    }

    return { data: dataPicture }
  } catch (error) {
    return { error }
  }
}

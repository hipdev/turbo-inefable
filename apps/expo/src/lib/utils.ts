import { Toast } from "react-native-toast-message/lib/src/Toast"

export const currentMonthAndDay = new Date().toLocaleDateString("es-CO", {
  month: "long",
  day: "numeric",
})

type ToastType = {
  isUpdate?: boolean
}

export const SITE_URL = "https://www.inefable.us"
export const BUCKET_URL =
  "https://wvwiljxejnwmtlrvqlcw.supabase.co/storage/v1/object/public/cdn-inefable"

export const successToast = ({ isUpdate = false }: Partial<ToastType> = {}) => {
  Toast.show({
    type: "success",
    text1: "Yujuu!",
    text2: isUpdate
      ? "Actualizado correctamente 🥳"
      : "Guardado correctamente 🥳",
    position: "bottom",
    visibilityTime: 2500,
    bottomOffset: 80,
  })
  return
}

type ErrorToastType = {
  errorText?: string
}

export const errorToast = ({ errorText }: Partial<ErrorToastType> = {}) => {
  Toast.show({
    type: "error",
    text1: "Upss!",
    text2: errorText || "Ocurrió un error al guardar 😢",
    position: "bottom",
    visibilityTime: 2500,
    bottomOffset: 80,
  })
}

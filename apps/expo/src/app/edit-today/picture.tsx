import { useEffect, useRef, useState } from "react"
import { Image, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import {
  Camera,
  CameraType,
  FlashMode,
  type CameraCapturedPicture,
} from "expo-camera"
import { FlipType, manipulateAsync, SaveFormat } from "expo-image-manipulator"
import { Stack, useRouter } from "expo-router"
import { SwitchCamera, Zap, ZapOff } from "lucide-react-native"
import useSWR from "swr"

import { getToday, saveDiaryPicture } from "@inefable/api"

import { useAuthStore } from "~/components/stores/auth"
import supabase from "~/lib/supabase"
import { errorToast, successToast } from "~/lib/utils"

export default function EditDiary() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [image, setImage] = useState<CameraCapturedPicture | null>(null)
  const [type, setType] = useState(CameraType.back)
  const [flash, setFlash] = useState(FlashMode.off)
  const cameraRef = useRef<Camera | null>(null)

  const router = useRouter()

  const { user } = useAuthStore()

  useEffect(() => {
    ;(async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === "granted")
    })()
  }, [])

  const { data: todayData } = useSWR(
    user?.id ? ["getToday", user.id] : null,
    getToday,
  )

  const takePicture = async () => {
    if (cameraRef?.current) {
      // const supportedRatios = await cameraRef.current.getSupportedRatiosAsync()

      try {
        let picture = await cameraRef?.current.takePictureAsync({ exif: true })
        console.log(picture, "picture")
        if (type === CameraType.front) {
          picture = await manipulateAsync(
            picture.uri,
            [{ rotate: 180 }, { flip: FlipType.Vertical }],
            { compress: 1, format: SaveFormat.PNG },
          )
        }

        setImage(picture)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const savePicture = async () => {
    console.log(image, "image")

    if (!image || !user || !todayData) return

    const ext = image.uri.substring(image.uri.lastIndexOf(".") + 1)

    const formData = new FormData()
    const file = {
      uri: image.uri,
      name: `${todayData?.id}`,
      type: "image/" + ext,
    }

    formData.append("file", file)

    try {
      const { data, error } = await saveDiaryPicture({
        diary_id: todayData?.id,
        formData,
        user_id: user.id,
      })

      if (error) {
        errorToast({
          errorText: "Error guardando la foto, puede reintentarlo más tarde",
        })
        return
      }
      successToast()
      router.push("/today")

      console.log(data, "data")
    } catch (error) {
      console.log(error, "error")
    }

    return
  }

  if (hasCameraPermission == false) {
    return <Text>Necesita permiso para acceder a la cámara</Text>
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView className="flex-1">
        <View className="flex-1 justify-center bg-black">
          {!image ? (
            <Camera
              type={type}
              flashMode={flash}
              ref={cameraRef}
              className="flex-1"
              ratio="20:9"
            >
              <View className="flex-row justify-between  p-8">
                <TouchableOpacity
                  onPress={() =>
                    setType(
                      type === CameraType.back
                        ? CameraType.front
                        : CameraType.back,
                    )
                  }
                  className="h-10 flex-row items-center justify-center"
                >
                  <SwitchCamera className="text-white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    setFlash(
                      flash === FlashMode.off ? FlashMode.on : FlashMode.off,
                    )
                  }
                  className="h-10 flex-row items-center justify-center"
                >
                  {flash === FlashMode.off ? (
                    <ZapOff className="text-white " />
                  ) : (
                    <Zap className="text-white " />
                  )}
                </TouchableOpacity>
              </View>
            </Camera>
          ) : (
            <Image
              source={{ uri: image.uri }}
              className="w-full flex-1 object-contain"
            />
          )}
          <View>
            {image ? (
              <View className="flex-row justify-between px-14">
                <>
                  <TouchableOpacity
                    onPress={() => setImage(null)}
                    className="h-10 flex-row items-center justify-center"
                  >
                    <Text className=" text-lg text-white">Volver a tomar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={savePicture}
                    className="h-10 flex-row items-center justify-center"
                  >
                    <Text className=" text-lg text-white">Guardar</Text>
                  </TouchableOpacity>
                </>
              </View>
            ) : (
              <TouchableOpacity
                onPress={takePicture}
                className="h-10 flex-row items-center justify-center"
              >
                <Text className=" text-lg text-white">Tomar Foto</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

import { useEffect, useRef, useState } from "react"
import { Image, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Camera, CameraType, FlashMode } from "expo-camera"
import { Stack } from "expo-router"
import { SwitchCamera, Zap } from "lucide-react-native"
import useSWR from "swr"

import { getToday } from "@inefable/api"

import { useAuthStore } from "~/components/stores/auth"

export default function EditDiary() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [image, setImage] = useState<string>("")
  const [type, setType] = useState(CameraType.back)
  const [flash, setFlash] = useState(FlashMode.off)
  const cameraRef = useRef<Camera | null>(null)

  const { user } = useAuthStore()

  useEffect(() => {
    ;(async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus.status === "granted")
    })()
  }, [])

  const { data: todayData, mutate } = useSWR(
    user?.id ? ["getToday", user.id] : null,
    getToday,
  )

  const takePicture = async () => {
    if (cameraRef?.current) {
      try {
        const data = await cameraRef?.current.takePictureAsync()
        console.log(data, "picture")
        setImage(data.uri)
      } catch (error) {
        console.log(error)
      }
    }
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
      <View className="flex-1 justify-center bg-black">
        {!image ? (
          <Camera
            type={type}
            flashMode={flash}
            ref={cameraRef}
            className="flex-1 rounded-3xl"
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
                <Zap className="text-white" />
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <Image
            source={{ uri: image }}
            className="w-full flex-1 rounded-3xl object-contain"
          />
        )}
        <View>
          {image ? (
            <View className="flex-row justify-between px-14">
              <>
                <TouchableOpacity
                  onPress={() => setImage("")}
                  className="h-10 flex-row items-center justify-center"
                >
                  <Text className=" text-lg text-white">Volver a tomar</Text>
                </TouchableOpacity>
                <TouchableOpacity className="h-10 flex-row items-center justify-center">
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
    </>
  )
}

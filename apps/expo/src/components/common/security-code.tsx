import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"
import { useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import clsx from "clsx"

import { SITE_URL } from "~/lib/utils"
import { useAuthStore } from "../stores/auth"

const CELL_COUNT = 4

export interface ValidateCodeResponse {
  isValid: boolean
}

const SecurityCode = () => {
  const { session } = useAuthStore()

  const [enableMask, setEnableMask] = useState(true)
  const [invalidCode, setInvalidCode] = useState({
    isInvalid: false,
    attemps: 0,
    showQuestion: false,
  })
  const [value, setValue] = useState("")
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  const router = useRouter()

  const toggleMask = () => setEnableMask((currentState) => !currentState)

  useEffect(() => {
    const fetchCode = async (): Promise<ValidateCodeResponse> => {
      const res: ValidateCodeResponse = await fetch(
        `${SITE_URL}/api/validate-code`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: session?.access_token || "",
          },
          body: JSON.stringify({ value }),
        },
      ).then((res) => res.json())

      return res
    }

    if (value.length == 4) {
      const verifyCode = async () => {
        const res = await fetchCode()
        if (res.isValid) {
          const currentDate = new Date()
          const oneHourLater = new Date(currentDate.getTime() + 60 * 60 * 1000)
          const dateString = oneHourLater.toISOString()
          try {
            await AsyncStorage.setItem("unlockUntil", dateString)

            router.push("/")
          } catch (error) {
            console.log("Error saving date:", error)
          }
          setInvalidCode({ isInvalid: false, attemps: 0, showQuestion: false })
        } else {
          setInvalidCode({
            isInvalid: true,
            attemps: invalidCode.attemps + 1,
            showQuestion: invalidCode.attemps == 3,
          })
        }
      }

      verifyCode() // run it, run it
    }
  }, [value, session?.access_token])

  const renderCell = ({
    index,
    symbol,
    isFocused,
  }: {
    index: number
    symbol: string
    isFocused: boolean
  }) => {
    let textChild = null

    if (symbol) {
      textChild = enableMask ? "•" : symbol
    } else if (isFocused) {
      textChild = <Cursor />
    }

    return (
      <Text
        key={index}
        // style={[styles.cell, isFocused && styles.focusCell]}
        className={clsx(
          "ml-2 h-12 w-12 rounded-sm bg-black/20 text-center text-3xl leading-[45px]",
          isFocused && "bg-black/30",
        )}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {textChild}
      </Text>
    )
  }

  const handleCode = async () => {
    // const salt = await bcrypt.genSalt(5)
    // const hashedPassword = await bcrypt.hash(inputCode, salt)
  }

  return (
    <View className="h-[80vh] flex-1 justify-center bg-white">
      <View className="flex-1 justify-center p-10">
        <Text className="text-center text-3xl font-bold text-black/80">
          Desbloquear{" "}
        </Text>
        <View className="mt-5 flex-row justify-center">
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
          <Text
            className="h-20 w-20 text-center text-4xl leading-[45px]"
            onPress={toggleMask}
          >
            {enableMask ? "🙈" : "🐵"}
          </Text>
        </View>

        {invalidCode.isInvalid && invalidCode.attemps < 3 ? (
          <Text className="text-center text-lg font-medium text-red-400">
            El código es inválido
          </Text>
        ) : invalidCode.isInvalid && invalidCode.attemps >= 3 ? (
          <View>
            <Text className="text-center text-lg font-medium text-red-400">
              Pregunta de seguridad:
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  )
}

export default SecurityCode

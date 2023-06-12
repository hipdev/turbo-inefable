import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"
import { TextInput } from "react-native-gesture-handler"
import clsx from "clsx"

import { useAuthStore } from "../stores/auth"

const CELL_COUNT = 4

const SecurityCode = ({ setIsAllowed }) => {
  const { session } = useAuthStore()

  const [enableMask, setEnableMask] = useState(true)
  const [value, setValue] = useState("")
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  const [inputCode, setInputCode] = useState("")

  const toggleMask = () => setEnableMask((currentState) => !currentState)

  useEffect(() => {
    if (value.length == 4) {
      setIsAllowed(true)
      console.log("value", "value ready")
    }
  }, [value])

  const renderCell = ({ index, symbol, isFocused }) => {
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
          "ml-4 h-16 w-16 bg-black/20 text-center text-3xl leading-[60px] ",
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

    console.log(inputCode, "inputCode")

    try {
      const res = await fetch("http://localhost:3000/api/validate-code", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: session?.access_token || "",
        },
        body: JSON.stringify({ inputCode }),
      })
      console.log(res.status, "res")
    } catch (error) {
      console.log(error, "error")
    }
  }

  return (
    <View className="h-[80vh] flex-1 justify-center bg-white">
      <View className="mx-3 mt-10 flex-row items-center space-x-4">
        <TextInput
          value={inputCode}
          onChangeText={(text) => setInputCode(text)}
          placeholder="securitycode"
          className="flex-1  border text-2xl"
          maxLength={4}
          keyboardType="number-pad"
        />
        <TouchableOpacity onPress={handleCode}>
          <Text>Create</Text>
        </TouchableOpacity>
      </View>
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
            className="h-20 w-20 text-center text-4xl leading-[55px]"
            onPress={toggleMask}
          >
            {enableMask ? "🙈" : "🐵"}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default SecurityCode

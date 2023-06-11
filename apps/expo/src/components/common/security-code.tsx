import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { TextInput } from 'react-native-gesture-handler'

const CELL_COUNT = 4

const SecurityCode = ({ setIsAllowed }) => {
  const [enableMask, setEnableMask] = useState(true)
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  const [inputCode, setInputCode] = useState('')

  const toggleMask = () => setEnableMask((currentState) => !currentState)

  useEffect(() => {
    if (value.length == 4) {
      setIsAllowed(true)
      console.log('value', 'value ready')
    }
  }, [value])

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null

    if (symbol) {
      textChild = enableMask ? '•' : symbol
    } else if (isFocused) {
      textChild = <Cursor />
    }
    console.log(isFocused, 'is focused?')

    return (
      <Text
        key={index}
        // style={[styles.cell, isFocused && styles.focusCell]}
        className={clsx(
          'w-16 h-16 bg-black/20 ml-4 text-center text-3xl leading-[60px] ',
          isFocused && 'bg-black/30'
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

    console.log(inputCode, 'inputCode')
  }

  console.log('value', value)

  return (
    <View className='justify-center flex-1 h-[80vh] bg-white'>
      <View className='flex-row items-center mt-10 mx-3 space-x-4'>
        <TextInput
          value={inputCode}
          onChangeText={(text) => setInputCode(text)}
          placeholder='securitycode'
          className='text-2xl  border flex-1'
          maxLength={4}
          keyboardType='number-pad'
        />
        <TouchableOpacity onPress={handleCode}>
          <Text>Create</Text>
        </TouchableOpacity>
      </View>
      <View className='p-10 justify-center flex-1'>
        <Text className='text-3xl text-center font-bold text-black/80'>
          Desbloquear{' '}
        </Text>
        <View className='flex-row justify-center mt-5'>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType='number-pad'
            textContentType='oneTimeCode'
            renderCell={renderCell}
          />
          <Text
            className='h-20 w-20 text-4xl leading-[55px] text-center'
            onPress={toggleMask}
          >
            {enableMask ? '🙈' : '🐵'}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default SecurityCode

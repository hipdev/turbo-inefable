import { isToday, parseISO } from 'date-fns'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { useAuthStore } from '../../components/stores/auth'
import SecurityCode from '../common/security-code'

export default function Diaries({ diaries }) {
  const { user } = useAuthStore()
  const router = useRouter()

  const [isAllowed, setIsAllowed] = useState(false)

  return (
    <View className='flex flex-row flex-wrap'>
      {!isAllowed && <SecurityCode setIsAllowed={setIsAllowed} />}
      {isAllowed &&
        diaries?.map((diary) => (
          <TouchableOpacity
            onPress={() => {
              if (isToday(parseISO(diary.date))) {
                router.push('/today')
              }
            }}
            key={diary.id}
            className='w-1/3 h-24  flex items-center justify-center p-0.5'
          >
            <View className='bg-black/20 w-full h-full items-center justify-center'>
              <Text className='text-lg text-black/80 font-bold'>
                {diary.date}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  )
}

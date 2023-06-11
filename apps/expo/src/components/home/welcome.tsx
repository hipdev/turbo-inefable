import { View, Text, TouchableOpacity, ScrollView } from 'react-native'

import { useAuthStore } from '../../components/stores/auth'
import { Link } from 'expo-router'

export default function Welcome() {
  const { user } = useAuthStore()

  return (
    <>
      <Text className='text-4xl text-black/80'>
        Gracias {user?.user_metadata?.name.split(' ')[0]}, aquí estará tu diario
      </Text>
      <Text className='mt-6 text-lg font-medium text-black/80'>
        ¿Sabías que?
      </Text>
      <Text className='text-base text-black/80'>
        Escribir en un diario es una experiencia terapeutica porque te ayuda a
        liberar estrés, según un estudio de la Universidad de Texas. Nos
        emociona mucho que vas a empezar a escribir en tu diario, esperamos que
        te guste.
      </Text>

      <Link
        href='/today'
        className='mt-10 text-3xl font-extrabold text-primary'
      >
        Empezar hoy
      </Link>
    </>
  )
}

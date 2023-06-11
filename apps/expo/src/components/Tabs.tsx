import { Tabs } from 'expo-router'
import { Edit3, HelpCircle, Home, LogIn } from 'lucide-react-native'
import { useAuthStore } from './stores/auth'

export default function TabsLayout() {
  const { user } = useAuthStore()

  return (
    <Tabs>
      {/* Start no authenticated routes */}
      <Tabs.Screen
        name='login'
        options={{
          title: 'Login',
          tabBarIcon: () => <LogIn />,
          headerShown: false,
          ...(user && { href: null }),
        }}
      />

      <Tabs.Screen
        name='about'
        options={{
          title: 'Inefable?',
          tabBarIcon: () => <HelpCircle />,
          headerShown: false,
          ...(user && { href: null }),
        }}
      />
      {/* End no authenticated routes */}

      <Tabs.Screen
        name='index'
        options={{
          title: '',
          tabBarIcon: () => <Home />,
          headerShown: false,
          ...(!user && { href: null }),
        }}
      />

      <Tabs.Screen
        name='diary'
        options={{
          title: '',
          tabBarIcon: () => <Edit3 />,
          href: user,
          ...(!user && { href: null }),
        }}
      />
      <Tabs.Screen
        name='alarm'
        options={{
          title: '',
          tabBarIcon: () => <Edit3 />,
          href: user,
          ...(!user && { href: null }),
        }}
      />
    </Tabs>
  )
}

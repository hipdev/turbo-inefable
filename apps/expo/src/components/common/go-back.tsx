import { TouchableOpacity, View } from "react-native"
import { useRouter } from "expo-router"
import { ArrowLeftCircle } from "lucide-react-native"

export default function GoBack() {
  const router = useRouter()
  return (
    <TouchableOpacity onPress={() => router.back()} className="ml-3">
      <View style={{ marginRight: 10 }}>
        <ArrowLeftCircle size={30} className="text-black/70" />
      </View>
    </TouchableOpacity>
  )
}

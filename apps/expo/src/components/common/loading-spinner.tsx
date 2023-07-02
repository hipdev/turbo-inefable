import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "#590696",
    borderTopColor: "white",
  },
})

const LoadingSpinner = () => {
  const rotation = useSharedValue(0)

  // Update the rotation value continuously
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(1, {
        duration: 1100,
        easing: Easing.linear,
      }),
      -1,
      false,
    )
  }, [])

  // Define the animated style for the spinner
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value * 360}deg`,
        },
      ],
    }
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, animatedStyle]} />
    </View>
  )
}

export default LoadingSpinner

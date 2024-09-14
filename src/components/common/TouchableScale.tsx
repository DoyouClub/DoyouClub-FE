import type { StyleProp, TouchableWithoutFeedbackProps, ViewStyle } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'

type Props = Omit<TouchableWithoutFeedbackProps, 'onPressIn' | 'onPressOut'> & {
  activeScale?: number
  containerStyle?: StyleProp<ViewStyle>
}

const hitSlop = {
  top: 8,
  left: 8,
  right: 8,
  bottom: 8
} as const

const TouchableScale = ({ activeScale = 0.95, containerStyle, children, ...props }: Props) => {
  const scale = useSharedValue(1)

  return (
    <TouchableWithoutFeedback
      hitSlop={hitSlop}
      {...props}
      onPressIn={() => {
        scale.value = withTiming(activeScale, { duration: 200 })
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 300 })
      }}
      onLongPress={e => {
        scale.value = withTiming(activeScale, { duration: 200 })

        if (props.onLongPress) {
          props.onLongPress(e)
          scale.value = withTiming(1, { duration: 500 })
        }
      }}>
      <Animated.View style={[containerStyle, { transform: [{ scale }] }]}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default TouchableScale

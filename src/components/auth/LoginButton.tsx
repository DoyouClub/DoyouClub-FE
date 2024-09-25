import TouchableScale from '../common/TouchableScale.tsx'
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import { StyleSheet } from 'react-native'
import type { ReactNode } from 'react'
import Text from '../common/Text.tsx'
import type { ColorValue } from 'react-native/Libraries/StyleSheet/StyleSheet'

interface Props {
  icon: ReactNode
  text: string
  color?: ColorValue
  containerStyle?: StyleProp<ViewStyle>
  onPress?: (event: GestureResponderEvent) => void
}

const LoginButton = ({ onPress, icon, text, containerStyle, color }: Props) => {
  return (
    <TouchableScale containerStyle={[styles.container, containerStyle]} activeScale={0.98} onPress={onPress}>
      {icon}
      <Text
        style={{
          flex: 1,
          fontSize: 14,
          fontWeight: 'bold',
          color,
          textAlign: 'center'
        }}>
        {text}
      </Text>
    </TouchableScale>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 50,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8
  }
})

export default LoginButton

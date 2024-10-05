import type { GestureResponderEvent } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { MaterialIcons } from '../../lib/icon/icons.ts'
import type { ReactNode } from 'react'
import Text from '../common/Text.tsx'
import TouchableScale from '../common/TouchableScale.tsx'

interface Props {
  name: string
  icon: ReactNode
  onPress?: (event: GestureResponderEvent) => void
}

const MenuItem = ({ name, icon, onPress }: Props) => {
  return (
    <TouchableScale activeScale={0.99} onPress={onPress}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
          }}>
          {icon}
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold'
            }}>
            {name}
          </Text>
        </View>
        <MaterialIcons name="arrow-forward-ios" size={14} color="grey" />
      </View>
    </TouchableScale>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  }
})

export default MenuItem

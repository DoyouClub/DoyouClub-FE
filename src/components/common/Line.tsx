import type { ViewStyle } from 'react-native';
import { View } from 'react-native'

interface Props {
  style?: ViewStyle
}

const Line = ({ style }: Props) => {
  return (
    <View
      style={[
        {
          height: 0.4,
          marginVertical: 4,
          backgroundColor: 'rgb(200, 200, 200)'
        },
        style
      ]}
    />
  )
}

export default Line

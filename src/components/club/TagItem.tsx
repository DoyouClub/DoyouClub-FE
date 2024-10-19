import { StyleSheet, View } from 'react-native'
import Text from '../common/Text.tsx'
import { Tag } from '../../module/club/dto/enum.ts'

interface Props {
  tag: keyof typeof Tag
}

const TagItem = ({ tag }: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 10.5,
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center'
        }}>
        {Tag[tag]}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: 'rgb(180, 200, 220)'
  }
})

export default TagItem

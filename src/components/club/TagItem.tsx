import { StyleSheet, View } from 'react-native'
import Text from '../common/Text.tsx'
import type { Tag } from '../../module/club/dto/enum.d.ts'

interface Props {
  tag: Tag
}

const tags: Record<Tag, string> = {
  ACADEMIC: '학술',
  UNION: '연합회'
}

const TagItem = ({ tag }: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 10,
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center'
        }}>
        {tags[tag]}
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

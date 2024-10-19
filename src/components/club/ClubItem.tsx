import { Image, StyleSheet, View } from 'react-native'
import Text from '../common/Text.tsx'
import TagItem from './TagItem.tsx'
import type { ClubResponse } from '../../module/club/dto/response'

interface Props {
  club: ClubResponse
}

const ClubItem = ({ club }: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: 100,
          height: 100
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%'
          }}
          src={club.image}
          resizeMode="cover"
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          gap: 5
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold'
          }}>
          {club.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'light'
          }}>
          {club.description}
        </Text>
        <View style={styles.tag}>
          <TagItem tag={club.tag} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: 'rgb(200, 200, 200)',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowRadius: 3,
    elevation: 3
  },
  tag: {
    flexDirection: 'row',
    marginTop: 4
  }
})

export default ClubItem

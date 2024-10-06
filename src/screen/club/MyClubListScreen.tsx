import { StyleSheet, View } from 'react-native'
import { useQuery } from 'react-query'
import { getMyClubs } from '../../module/club/api.ts'
import FlatList from '../../components/common/FlatList.tsx'
import ClubItem from '../../components/club/ClubItem.tsx'

const MyClubListScreen = () => {
  const { data: clubs = [] } = useQuery(['getMyClubs'], getMyClubs)

  return (
    <View style={styles.container}>
      <FlatList
        data={clubs}
        renderItem={({ item }) => <ClubItem club={item} />}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 30
        }}
        listEmptyMessage="소속한 동아리가 없습니다."
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  }
})

export default MyClubListScreen

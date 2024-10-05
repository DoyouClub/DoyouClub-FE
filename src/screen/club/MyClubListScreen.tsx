import { StyleSheet, View } from 'react-native'
import ClubList from '../../components/club/ClubList.tsx'
import { useQuery } from 'react-query'
import { getMyClubs } from '../../module/club/api.ts'

const MyClubListScreen = () => {
  const { data: clubs = [] } = useQuery(['getMyClubs'], getMyClubs)

  return (
    <View style={styles.container}>
      <ClubList
        clubs={clubs}
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

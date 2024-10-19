import { StyleSheet, View } from 'react-native'
import { useQuery } from 'react-query'
import FlatList from '../../components/common/FlatList.tsx'
import ClubItem from '../../components/club/ClubItem.tsx'
import useSelector from '../../lib/redux/hook/useSelector.ts'
import { getClubsByUserId } from '../../module/club/api.ts'
import TouchableScale from '../../components/common/TouchableScale.tsx'
import type { NavigationProp } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import type { NavigatorParamList } from '../../navigation/navigation'

const MyClubListScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigatorParamList>>()
  const user = useSelector(store => store.user.user)
  const { data: clubs = [] } = useQuery(['getClubsByUserId', user!.id], () => getClubsByUserId(user!.id))

  return (
    <View style={styles.container}>
      <FlatList
        data={clubs}
        renderItem={({ item }) => (
          <TouchableScale activeScale={0.98} onPress={() => navigation.navigate('clubInfo', { club: item })}>
            <ClubItem club={item} />
          </TouchableScale>
        )}
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

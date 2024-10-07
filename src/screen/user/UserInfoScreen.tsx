import useSelector from '../../lib/redux/hook/useSelector.ts'
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import Text from '../../components/common/Text.tsx'
import suya from '../../static/image/suya.jpg'
import MenuItem from '../../components/user/MenuItem.tsx'
import { Ionicons, MaterialIcons } from '../../lib/icon/icons.ts'
import type { NavigationProp } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import type { NavigatorParamList } from '../../navigation/navigation'
import Line from '../../components/common/Line.tsx'

const UserInfoScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigatorParamList>>()
  const user = useSelector(store => store.user.user!)

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgb(250, 250, 250)'
      }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.profile}>
            <View style={styles.image}>
              <Image
                source={suya}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 12
                }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: 'extra'
                }}>
                {user.name}
              </Text>
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: 'normal'
                }}>
                님
              </Text>
            </View>
          </View>
          <Line />
          <View style={styles.menuList}>
            <Text style={styles.menuTitle}>동아리</Text>
            <MenuItem
              name="내 동아리"
              icon={<MaterialIcons name="people" size={22} />}
              onPress={() => navigation.navigate('myClubList')}
            />
          </View>
          <Line />
          <View style={styles.menuList}>
            <Text style={styles.menuTitle}>게시판</Text>
            <MenuItem
              name="내 게시글"
              icon={<Ionicons name="pencil-outline" size={22} />}
              onPress={() => navigation.navigate('myPostList')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 0.2,
    borderColor: 'rgb(220, 220, 220)'
  },
  profile: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: 'rgb(250, 250, 250)'
  },
  menuList: {
    paddingHorizontal: 12,
    paddingVertical: 20
  },
  menuTitle: {
    marginBottom: 10,
    color: 'rgb(140, 140, 140)',
    fontSize: 13,
    fontWeight: 'bold'
  }
})

export default UserInfoScreen

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
import { useEffect, useState } from 'react'
import useInput from '../../lib/react/hook/useInput.ts'
import TextInput from '../../components/common/TextInput.tsx'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { updateUserById } from '../../module/user/api.ts'
import { setUser } from '../../lib/redux/reducer/userReducer.ts'
import TouchableScale from '../../components/common/TouchableScale.tsx'

const UserInfoScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigatorParamList>>()
  const user = useSelector(store => store.user.user!)
  const dispatch = useDispatch()
  const [isUpdating, setIsUpdating] = useState(false)
  const { mutate: updateUser } = useMutation((id: string) => updateUserById(id, { name }), {
    onMutate: () => {
      const previousUser = { ...user }

      dispatch(setUser({ ...user, name }))

      return { previousUser }
    },
    onError: (_error, _variables, context) => {
      dispatch(setUser(context!.previousUser))
    }
  })
  const nameStates = useInput('name', {
    maxLength: 4,
    canEmpty: false,
    initialValue: user.name
  })
  const { value: name, setValue: setName, ref: nameRef } = nameStates

  useEffect(() => {
    if (isUpdating) nameRef.current?.focus()
  }, [isUpdating])

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
            <View style={{ gap: 9 }}>
              {isUpdating ? (
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    states={nameStates}
                    style={{
                      fontSize: 26,
                      fontWeight: 'extra',
                      borderBottomWidth: 0.4
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 26,
                      fontWeight: 'normal'
                    }}>
                    님
                  </Text>
                </View>
              ) : (
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
              )}
              <View style={{ flexDirection: 'row' }}>
                <TouchableScale
                  containerStyle={styles.updateButton}
                  onPress={() => {
                    if (isUpdating) updateUser(user.id)
                    setIsUpdating(current => !current)
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      color: 'white'
                    }}>
                    {isUpdating ? '저장' : '수정'}
                  </Text>
                </TouchableScale>
              </View>
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
  },
  updateButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 9,
    borderRadius: 8,
    backgroundColor: 'rgb(160, 160, 255)',
    shadowColor: 'rgb(180, 180, 180)',
    shadowOffset: {
      width: 0,
      height: 0.3
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3
  }
})

export default UserInfoScreen

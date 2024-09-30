import { SafeAreaView, StyleSheet, View } from 'react-native'
import { useCallback } from 'react'
import { Ionicons } from '../../lib/icon/icons.ts'
import { login as kakaoLogin } from '@react-native-seoul/kakao-login'
import type { NavigationProp } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import type { NavigatorParamList } from '../../navigation/navigation'
import Text from '../../components/common/Text.tsx'
import LoginButton from '../../components/auth/LoginButton.tsx'
import type { SignInRequest } from '../../module/auth/dto/request'
import { signIn } from '../../module/auth/api.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getMyUser } from '../../module/user/api.ts'
import { useDispatch } from 'react-redux'
import { setUser } from '../../lib/redux/reducer/userReducer.ts'

const SignInScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigatorParamList>>()
  const dispatch = useDispatch()

  const signInHandler = useCallback(async (request: SignInRequest) => {
    const response = await signIn(request)

    if (response.isNew && response.signUpToken) {
      navigation.navigate('signUp', {
        email: response.email,
        token: response.signUpToken
      })
    } else if (response.accessToken && response.refreshToken) {
      await Promise.all([
        AsyncStorage.setItem('accessToken', response.accessToken),
        AsyncStorage.setItem('refreshToken', response.refreshToken)
      ])

      dispatch(setUser(await getMyUser()))

      navigation.navigate('stack')
    }
  }, [])

  const kakaoHandler = useCallback(async () => {
    const { accessToken } = await kakaoLogin()

    return signInHandler({
      token: accessToken,
      provider: 'KAKAO'
    })
  }, [signInHandler])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text
          style={{
            fontSize: 38,
            fontWeight: 'extra',
            color: 'rgb(110, 170, 205)'
          }}>
          DoyouClub
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'rgb(80, 100, 120)'
          }}>
          삼육대학교 동아리 플랫폼
        </Text>
      </View>
      <View style={styles.loginButtons}>
        <LoginButton
          icon={<Ionicons name="chatbubble" size={20} />}
          text="Kakao로 로그인"
          containerStyle={{ backgroundColor: '#FEE500' }}
          onPress={kakaoHandler}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 35
  },
  title: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  loginButtons: {
    flex: 1,
    width: '90%',
    gap: 10
  }
})

export default SignInScreen

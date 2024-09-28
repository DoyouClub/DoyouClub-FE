import { StyleSheet, View } from 'react-native'
import { AntDesign } from '../../lib/icon/icons.ts'
import Text from '../../components/common/Text.tsx'
import TextInput from '../../components/common/TextInput.tsx'
import TouchableScale from '../../components/common/TouchableScale.tsx'
import useInput from '../../lib/react/hook/useInput.ts'
import type { NavigationProp, RouteProp } from '@react-navigation/native'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { NavigatorParamList } from '../../navigation/navigation'
import { AnimatedView } from '../../lib/reanimated/animated.ts'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useCallback, useMemo } from 'react'
import type { SignUpRequest } from '../../module/auth/dto/request'
import { signUp } from '../../module/auth/api.ts'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigatorParamList, 'signUp'>>()
  const route = useRoute<RouteProp<NavigatorParamList, 'signUp'>>()
  const { email, token } = route.params
  const nameStates = useInput('name', { maxLength: 4, canEmpty: false })
  const { value: name } = nameStates
  const isSubmittable = useMemo(() => nameStates.value.length > 0, [nameStates])
  const activatedSignUpStyle = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(isSubmittable ? 'rgb(180, 200, 255)' : 'rgb(230, 230, 230)', { duration: 500 }),
      shadowColor: withTiming(isSubmittable ? 'rgb(180, 200, 255)' : 'rgb(230, 230, 230)', { duration: 500 })
    }),
    [isSubmittable]
  )

  const signUpHandler = useCallback(async (request: SignUpRequest) => {
    const response = await signUp(request)

    await Promise.all([
      AsyncStorage.setItem('accessToken', response.accessToken),
      AsyncStorage.setItem('refreshToken', response.refreshToken)
    ])
    navigation.navigate('stack')
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'extra'
          }}>
          회원가입
        </Text>
        <Text
          style={{
            color: 'rgb(100, 100, 100)',
            fontSize: 16,
            fontWeight: 'light',
            lineHeight: 20,
            letterSpacing: 0.1
          }}>
          삼육대학교 학생이라면{'\n'}
          누구나 두유클럽을 이용할 수 있어요.
        </Text>
      </View>
      <View style={{ gap: 8 }}>
        <View style={styles.input}>
          <AntDesign name="idcard" size={16} color="grey" />
          <TextInput
            states={nameStates}
            style={{
              flex: 1,
              fontWeight: 'normal',
              fontSize: 13
            }}
            placeholder="이름"
            textContentType="name"
          />
        </View>
      </View>
      <TouchableScale
        activeScale={0.98}
        onPress={() =>
          signUpHandler({
            email,
            token,
            name
          })
        }>
        <AnimatedView style={[styles.signUp, activatedSignUpStyle]}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 15
            }}>
            가입
          </Text>
        </AnimatedView>
      </TouchableScale>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 18
  },
  title: {
    gap: 8,
    marginVertical: 40
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: 'rgb(250, 250, 250)',
    borderBottomWidth: 0.2,
    borderColor: 'rgb(200, 200, 200)'
  },
  signUp: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgb(170, 200, 255)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  }
})

export default SignUpScreen

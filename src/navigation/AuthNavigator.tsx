import type { ParamListBase } from '@react-navigation/native'
import SignInScreen from '../screen/auth/SignInScreen.tsx'
import { createStackNavigator } from '@react-navigation/stack'
import SignUpScreen from '../screen/auth/SignUpScreen.tsx'

interface AuthNavigatorParamList extends ParamListBase {
  signIn: undefined
  signUp: {
    email: string
    token: string
  }
}

const { Navigator, Screen } = createStackNavigator<AuthNavigatorParamList>()

const AuthNavigator = () => {
  return (
    <Navigator
      initialRouteName="signIn"
      screenOptions={{
        headerBackTitleVisible: false,
        headerLeftContainerStyle: { left: 10 },
        headerStyle: { backgroundColor: 'rgb(250, 250, 250)' },
        headerShadowVisible: false,
        headerTintColor: 'rgb(50, 50, 50)',
        headerTitle: undefined,
        cardStyle: { backgroundColor: 'rgb(250, 250, 250)' }
      }}>
      <Screen name="signIn" component={SignInScreen} options={{ headerShown: false }} />
      <Screen name="signUp" component={SignUpScreen} options={{ headerTitle: '' }} />
    </Navigator>
  )
}

export type { AuthNavigatorParamList }
export default AuthNavigator

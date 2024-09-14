import type { ParamListBase } from '@react-navigation/native'
import SignInScreen from '../screen/auth/SignInScreen.tsx'
import { createStackNavigator } from '@react-navigation/stack'

interface AuthNavigatorParamList extends ParamListBase {
  signIn: undefined
}

const { Navigator, Screen } = createStackNavigator<AuthNavigatorParamList>()

const AuthNavigator = () => {
  return (
    <Navigator
      initialRouteName="signIn"
      screenOptions={{
        headerBackTitleVisible: false
      }}>
      <Screen name="signIn" component={SignInScreen} options={{ headerShown: false }} />
    </Navigator>
  )
}

export type { AuthNavigatorParamList }
export default AuthNavigator

import type { ParamListBase } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AuthNavigator from './AuthNavigator.tsx'
import StackNavigator from './StackNavigator.tsx'

interface RootNavigatorParamList extends ParamListBase {
  auth: undefined
  stack: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<RootNavigatorParamList>()

const RootNavigator = () => {
  return (
    <Navigator initialRouteName="stack" tabBar={() => <></>} screenOptions={{ headerShown: false }}>
      <Screen name="auth" component={AuthNavigator} />
      <Screen name="stack" component={StackNavigator} />
    </Navigator>
  )
}

export type { RootNavigatorParamList }
export default RootNavigator

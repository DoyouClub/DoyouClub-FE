import type { ParamListBase } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { Dimensions } from 'react-native'
import TabNavigator from './TabNavigator.tsx'

interface StackNavigatorParamList extends ParamListBase {
  tab: undefined
}

const { Navigator, Screen } = createStackNavigator<StackNavigatorParamList>()

const StackNavigator = () => {
  return (
    <Navigator
      initialRouteName="tab"
      screenOptions={{
        headerLeftContainerStyle: { left: 10 },
        headerRightContainerStyle: { right: 12 },
        headerStyle: { backgroundColor: 'rgb(250, 250, 250)' },
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: 'NanumSqaure_acB'
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerTintColor: 'rgb(50, 50, 50)',
        cardStyle: { backgroundColor: 'rgb(250, 250, 250)' },
        gestureEnabled: true,
        gestureResponseDistance: Dimensions.get('screen').width,
        gestureVelocityImpact: 0.5,
        ...TransitionPresets.SlideFromRightIOS
      }}>
      <Screen name="tab" component={TabNavigator} options={{ headerShown: false }} />
    </Navigator>
  )
}

export type { StackNavigatorParamList }
export default StackNavigator

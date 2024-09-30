import type { ParamListBase } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screen/HomeScreen.tsx'
import ClubListScreen from '../screen/club/ClubListScreen.tsx'
import BoardScreen from '../screen/board/BoardScreen.tsx'
import { Ionicons } from '../lib/icon/icons.ts'
import UserInfoScreen from '../screen/user/UserInfoScreen.tsx'

interface TabNavigatorParamList extends ParamListBase {
  home: undefined
  board: undefined
  clubList: undefined
  userInfo: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<TabNavigatorParamList>()

const TabNavigator = () => {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18
        },
        tabBarLabelStyle: { fontFamily: 'NanumSqaure_acB' },
        tabBarActiveTintColor: 'rgb(150, 150, 255)',
        tabBarInactiveTintColor: 'rgb(180, 180, 180)'
      }}>
      <Screen
        name="home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="home" size={18} color={color} />
            ) : (
              <Ionicons name="home-outline" size={18} color={color} />
            )
        }}
      />
      <Screen
        name="board"
        component={BoardScreen}
        options={{
          title: '게시판',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="chatbox" size={18} color={color} />
            ) : (
              <Ionicons name="chatbox-outline" size={18} color={color} />
            )
        }}
      />
      <Screen
        name="clubList"
        component={ClubListScreen}
        options={{
          title: '동아리',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="search" size={18} color={color} />
            ) : (
              <Ionicons name="search" size={18} color={color} />
            )
        }}
      />
      <Screen
        name="userInfo"
        component={UserInfoScreen}
        options={{
          title: '내 정보',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="person" size={18} color={color} />
            ) : (
              <Ionicons name="person-outline" size={18} color={color} />
            )
        }}
      />
    </Navigator>
  )
}

export type { TabNavigatorParamList }
export default TabNavigator

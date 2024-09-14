import type { StackNavigatorParamList } from './StackNavigator.tsx'
import type { AuthNavigatorParamList } from './AuthNavigator.tsx'
import type { TabNavigatorParamList } from './TabNavigator.tsx'

type NavigatorParamList = AuthNavigatorParamList & StackNavigatorParamList & TabNavigatorParamList

export type { NavigatorParamList }

import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import type { NavigationProp, RouteProp } from '@react-navigation/native'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { NavigatorParamList } from '../../navigation/navigation'
import { AnimatedText, AnimatedView } from '../../lib/reanimated/animated.ts'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { match } from 'ts-pattern'
import TouchableScale from '../../components/common/TouchableScale.tsx'
import Text from '../../components/common/Text.tsx'
import TagItem from '../../components/club/TagItem.tsx'
import ClubDetail from '../../components/club/ClubDetail.tsx'

type DisplayType = keyof typeof displayTypes

const displayTypes = {
  detail: '상세 정보'
} as const

const ClubInfoScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigatorParamList, 'clubInfo'>>()
  const route = useRoute<RouteProp<NavigatorParamList, 'clubInfo'>>()
  const { club } = route.params
  const [displayType, setDisplayType] = useState<DisplayType>('detail')
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableScale onPress={() => setNotification(current => !current)}>
          {notification ? (
            <MaterialCommunityIcons name="bell" size={25} />
          ) : (
            <MaterialCommunityIcons name="bell-outline" size={25} />
          )}
        </TouchableScale>
      )
    })
  }, [notification])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(250, 250, 250)" />
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 12 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'normal',
              color: 'rgb(120, 120, 120)'
            }}>
            {club.description}
          </Text>
        </View>
        <View style={styles.name}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'extra'
            }}>
            {club.name}
          </Text>
        </View>
        <View style={styles.tags}>
          {club.tags.map(tag => (
            <TagItem tag={tag} key={tag} />
          ))}
        </View>
        <View
          style={{
            height: 10,
            marginTop: 20,
            marginBottom: 12,
            backgroundColor: 'rgb(242, 242, 242)'
          }}
        />
        <View style={styles.buttons}>
          {Object.keys(displayTypes).map(type => (
            <TypeButton
              displayType={type as DisplayType}
              setDisplayType={setDisplayType}
              currentType={displayType}
              key={type}
            />
          ))}
        </View>
        {match(displayType)
          .with('detail', () => <ClubDetail club={club} />)
          .exhaustive()}
      </View>
    </ScrollView>
  )
}

const TypeButton = ({
  displayType,
  setDisplayType,
  currentType
}: {
  displayType: DisplayType
  setDisplayType: Dispatch<SetStateAction<DisplayType>>
  currentType: DisplayType
}) => {
  const selectedButtonStyle = useAnimatedStyle(
    () => ({
      borderBottomColor: withTiming(displayType === currentType ? 'rgb(135, 200, 215)' : 'white', { duration: 300 })
    }),
    [currentType]
  )
  const selectedTextStyle = useAnimatedStyle(
    () => ({
      color: withTiming(displayType === currentType ? 'rgb(70, 150, 160)' : 'rgb(0, 0, 0)', { duration: 300 })
    }),
    [currentType]
  )

  return (
    <TouchableScale
      activeScale={0.98}
      style={{
        flex: 1,
        alignItems: 'center'
      }}
      onPress={() => setDisplayType(displayType)}>
      <AnimatedView style={[styles.button, selectedButtonStyle]}>
        <AnimatedText style={[{ textAlign: 'center' }, selectedTextStyle]}>{displayTypes[displayType]}</AnimatedText>
      </AnimatedView>
    </TouchableScale>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15
  },
  name: {
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 12
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    paddingHorizontal: 12
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 6,
    marginBottom: 15,
    borderBottomWidth: 0.3,
    borderColor: 'rgb(200, 200, 200)'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderBottomWidth: 3
  }
})

export default ClubInfoScreen

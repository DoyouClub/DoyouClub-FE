import type { ClubResponse } from '../../module/club/dto/response'
import type { FlatListProps } from 'react-native'
import { FlatList } from 'react-native'
import ClubItem from './ClubItem.tsx'
import { AnimatedView } from '../../lib/reanimated/animated.ts'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import Text from '../common/Text.tsx'

type Props = {
  clubs: ClubResponse[]
  listEmptyMessage?: string
} & Omit<FlatListProps<ClubResponse>, 'data' | 'renderItem'>

const ClubList = ({ clubs, listEmptyMessage, ...props }: Props) => {
  return (
    <FlatList
      style={{ height: '100%' }}
      data={clubs}
      renderItem={({ item }) => <ClubItem club={item} />}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      {...(listEmptyMessage && {
        ListEmptyComponent: (
          <AnimatedView
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 600
            }}
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}>
            <Text
              style={{
                fontWeight: 'normal',
                fontSize: 14
              }}>
              {listEmptyMessage}
            </Text>
          </AnimatedView>
        )
      })}
      {...props}
      contentContainerStyle={[{ gap: 10 }, props.contentContainerStyle]}
    />
  )
}

export default ClubList

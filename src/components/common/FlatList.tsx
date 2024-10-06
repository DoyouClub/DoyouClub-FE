import type { FlatListProps } from 'react-native'
import { FlatList as RNFlatList } from 'react-native'
import { AnimatedView } from '../../lib/reanimated/animated.ts'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import Text from './Text.tsx'

type Props<T> = { listEmptyMessage?: string } & FlatListProps<T>

const FlatList = <T,>({ listEmptyMessage, ...props }: Props<T>) => {
  return (
    <RNFlatList
      style={[{ height: '100%' }, props.style]}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      contentContainerStyle={[{ gap: 10 }, props.contentContainerStyle]}
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
    />
  )
}

export default FlatList

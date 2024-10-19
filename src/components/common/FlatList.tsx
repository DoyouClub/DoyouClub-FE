import type { FlatListProps } from 'react-native'
import { FlatList as RNFlatList, RefreshControl } from 'react-native'
import { AnimatedView } from '../../lib/reanimated/animated.ts'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import Text from './Text.tsx'
import { useState } from 'react'

type Props<T> = { listEmptyMessage?: string; useRefresh?: boolean; onRefresh?: () => void } & FlatListProps<T>

const FlatList = <T,>({ listEmptyMessage, useRefresh = false, onRefresh, ...props }: Props<T>) => {
  const [refreshing] = useState(false)

  return (
    <RNFlatList
      style={[{ height: '100%' }, props.style]}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      ListEmptyComponent={
        listEmptyMessage ? (
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
        ) : (
          <></>
        )
      }
      refreshControl={useRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : <></>}
      {...props}
      contentContainerStyle={[{ gap: 10 }, props.contentContainerStyle]}
    />
  )
}

export default FlatList

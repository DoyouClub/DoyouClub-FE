import { useRef, useState } from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import { Entypo, Ionicons } from '../../lib/icon/icons.ts'
import Text from '../common/Text.tsx'
import TouchableScale from '../common/TouchableScale.tsx'
import ImageSlide from '../board/ImageSlide.tsx'
import { toElapsedTime } from '../../lib/util/datatime.ts'
import type { PostResponse } from '../../module/post/dto/response'
import { useQuery } from 'react-query'
import { getClubsByUserId } from '../../module/club/api.ts'
import { getBoardById } from '../../module/board/api.ts'

interface Props {
  post: PostResponse
}

const PostItem = ({ post }: Props) => {
  const { data: board } = useQuery(['getBoardById', post.boardId], () => getBoardById(post.boardId))
  const { data: clubs = [] } = useQuery(['getClubsByUserId', post.writerId], () => getClubsByUserId(post.writerId))
  const [index, setIndex] = useState(0)
  const doubleTapRef = useRef<TapGestureHandler>(null)

  return (
    <GestureHandlerRootView>
      <TapGestureHandler waitFor={doubleTapRef}>
        <TapGestureHandler ref={doubleTapRef} numberOfTaps={2}>
          <View style={styles.container}>
            <View style={styles.profile}>
              <Ionicons name="person-circle-sharp" size={35} color="rgb(200, 200, 200)" />
              <View style={{ gap: 2.5 }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 12
                  }}>
                  두유
                </Text>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 10,
                    color: 'grey'
                  }}>
                  {clubs.map(club => club.name)}
                </Text>
              </View>
            </View>
            <View style={styles.images}>
              <ImageSlide images={post.images} index={index} setIndex={setIndex} />
            </View>
            <View
              style={{
                paddingHorizontal: 12,
                gap: 2
              }}>
              <View style={styles.body}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13
                  }}
                  numberOfLines={1}>
                  {post.title}
                </Text>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 12,
                    lineHeight: 18
                  }}
                  numberOfLines={5}>
                  {post.content}
                </Text>
              </View>
              <View style={{ justifyContent: 'space-between' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4
                    }}>
                    <GestureDetector gesture={Gesture.Tap()}>
                      <TouchableScale activeScale={0.8}>
                        <Ionicons name="heart-outline" size={24} color="red" />
                      </TouchableScale>
                    </GestureDetector>
                    <Text
                      style={{
                        fontSize: 13,
                        color: 'red',
                        fontWeight: 'bold'
                      }}>
                      0
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4
                    }}>
                    <TouchableScale activeScale={0.8}>
                      <Ionicons name="chatbubble-outline" size={22} color="rgb(140, 180, 255)" />
                    </TouchableScale>
                    <Text
                      style={{
                        fontSize: 13,
                        color: 'rgb(140, 180, 255)',
                        fontWeight: 'bold'
                      }}>
                      0
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2
                  }}>
                  {board && (
                    <Text
                      style={{
                        marginVertical: 10,
                        fontWeight: 'light',
                        fontSize: 10,
                        color: 'grey'
                      }}>
                      {board.name}
                    </Text>
                  )}
                  <Entypo name="dot-single" size={10} color="rgb(200, 200, 200)" />
                  <Text
                    style={{
                      marginVertical: 10,
                      fontSize: 10,
                      color: 'grey',
                      fontWeight: 'light'
                    }}>
                    {toElapsedTime(post.createdDate)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TapGestureHandler>
      </TapGestureHandler>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: { paddingVertical: 8 },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  images: { marginVertical: 8 },
  body: {
    gap: 4,
    marginTop: 6,
    marginBottom: 8
  }
})

export default PostItem

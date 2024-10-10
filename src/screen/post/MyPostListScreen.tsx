import FlatList from '../../components/common/FlatList.tsx'
import { StyleSheet, View } from 'react-native'
import { useInfiniteQuery } from 'react-query'
import { getMyPostPage } from '../../module/post/api.ts'
import PostItem from '../../components/post/PostItem.tsx'
import Line from '../../components/common/Line.tsx'

const pageSize = 5

const MyPostListScreen = () => {
  const {
    data: infinitePosts,
    fetchNextPage,
    hasNextPage,
    isFetching
  } = useInfiniteQuery(['getMyPostPage'], ({ pageParam = undefined }) => getMyPostPage(pageSize, pageParam as string), {
    getNextPageParam: lastPage => {
      const lastItem = lastPage[lastPage.length - 1]

      return lastItem ? lastItem.createdDate : undefined
    }
  })

  return (
    <View style={styles.container}>
      <FlatList
        data={infinitePosts?.pages.flat()}
        renderItem={({ item }) => (
          <>
            <PostItem post={item} />
            <Line />
          </>
        )}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 30
        }}
        onEndReachedThreshold={0.4}
        onEndReached={() => hasNextPage && !isFetching && fetchNextPage()}
        listEmptyMessage="작성한 게시글이 없습니다."
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {}
})

export default MyPostListScreen

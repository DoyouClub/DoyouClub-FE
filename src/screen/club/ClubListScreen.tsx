import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'
import SearchBar from '../../components/common/SearchBar.tsx'
import FilterItem from '../../components/club/FilterItem.tsx'
import FilterModal from '../../components/club/FilterModal.tsx'
import FlatList from '../../components/common/FlatList.tsx'
import ClubItem from '../../components/club/ClubItem.tsx'
import { useInfiniteQuery } from 'react-query'
import { searchClubPage } from '../../module/club/api.ts'
import type { SearchClubPageRequest } from '../../module/club/dto/request'
import { Activity, Tag } from '../../module/club/dto/enum.ts'
import TouchableScale from '../../components/common/TouchableScale.tsx'
import type { NavigationProp } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import type { NavigatorParamList } from '../../navigation/navigation'

const pageSize = 5

type Filter = NonNullable<Pick<SearchClubPageRequest, 'tag' | 'activity'>>

const filterNames: Record<keyof Filter, string> = {
  tag: '태그',
  activity: '활동'
} as const

const filters: Record<keyof Filter, Record<string, string>> = {
  tag: Tag,
  activity: Activity
}

const ClubListScreen = () => {
  const navigation = useNavigation<NavigationProp<NavigatorParamList>>()
  const [request, setRequest] = useState<SearchClubPageRequest>({ name: '' })
  const {
    data: infiniteClub,
    hasNextPage,
    isFetching,
    fetchNextPage,
    refetch
  } = useInfiniteQuery(
    ['searchClubPage', request],
    ({ pageParam = undefined }) => searchClubPage(request, pageSize, pageParam as string),
    {
      getNextPageParam: lastPage => {
        const lastItem = lastPage[lastPage.length - 1]

        return lastItem ? lastItem.id : undefined
      }
    }
  )
  const [currentFilter, setCurrentFilter] = useState<keyof Filter>('tag')
  const [filterModal, setFilterModal] = useState(false)
  const setName = useCallback((name: string) => setRequest({ ...request, name }), [request])
  const filterHandler = useCallback((filter: keyof Filter) => {
    setFilterModal(true)
    setCurrentFilter(filter)
  }, [])

  const onEndReachedHandler = useCallback(async () => {
    if (hasNextPage && !isFetching) await fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'rgb(250, 250, 250)'
      }}>
      <View style={styles.container}>
        <SearchBar setText={setName} placeholder="동아리 이름을 입력해주세요." />
        <View>
          <ScrollView horizontal contentContainerStyle={{ gap: 2 }}>
            {(Object.keys(filterNames) as (keyof Filter)[]).map(filter => (
              <FilterItem
                request={request as Filter}
                filter={filter}
                filters={filters}
                filterNames={filterNames}
                filterHandler={filterHandler}
                key={filter}
              />
            ))}
          </ScrollView>
        </View>
        <FlatList
          data={infiniteClub?.pages.flat()}
          renderItem={({ item }) => (
            <TouchableScale activeScale={0.98} onPress={() => navigation.navigate('clubInfo', { club: item })}>
              <ClubItem club={item} />
            </TouchableScale>
          )}
          contentContainerStyle={{
            paddingTop: 5,
            paddingBottom: 10
          }}
          onEndReached={onEndReachedHandler}
          onEndReachedThreshold={0.4}
          onRefresh={refetch}
          listEmptyMessage="검색된 동아리가 없습니다."
          useRefresh
        />
      </View>
      <FilterModal
        isVisible={filterModal}
        setIsVisible={setFilterModal}
        filter={filters[currentFilter]}
        currentFilter={currentFilter}
        filterNames={filterNames}
        request={request as Filter}
        setRequest={setRequest as Dispatch<SetStateAction<Filter>>}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 10,
    paddingTop: 4
  }
})

export default ClubListScreen

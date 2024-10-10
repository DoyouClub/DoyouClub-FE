import { FlatList, LayoutAnimation, StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from '../common/Text.tsx'
import Modal from '../common/Modal.tsx'
import { Feather } from '../../lib/icon/icons.ts'
import type { Dispatch, SetStateAction } from 'react'

interface Props<T extends Record<string, string>> {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  filter: Record<string, string>
  currentFilter: keyof T
  filterNames: Record<keyof T, string>
  request: T
  setRequest: Dispatch<SetStateAction<T>>
}

const FilterModal = <T extends Record<string, string>>({
  isVisible,
  setIsVisible,
  filter,
  currentFilter,
  filterNames,
  request,
  setRequest
}: Props<T>) => {
  return (
    <Modal
      style={{ justifyContent: 'flex-end' }}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      containerStyle={styles.container}
      useNativeDriver>
      <Text
        style={{
          marginVertical: 15,
          fontWeight: 'bold'
        }}>
        {filterNames[currentFilter]}
      </Text>
      <FlatList
        style={{ width: '100%' }}
        data={Object.keys(filter)}
        ListHeaderComponent={() => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setRequest(current => {
                delete current[currentFilter]

                return { ...current }
              })
              setIsVisible(false)
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            }}>
            <View style={styles.value}>
              <Text>전체</Text>
            </View>
          </TouchableOpacity>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setRequest(current => {
                ;(current[currentFilter] as string) = item

                return { ...current }
              })
              setIsVisible(false)
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            }}>
            <View style={styles.value}>
              <Text
                style={
                  item === request[currentFilter]
                    ? {
                        fontWeight: 'bold',
                        color: 'rgb(95, 135, 250)'
                      }
                    : undefined
                }>
                {filter[item]}
              </Text>
              {item === request[currentFilter] && (
                <Feather style={{ paddingRight: 10 }} name="check" size={16} color="rgb(95, 135, 250)" />
              )}
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 330,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white'
  },
  value: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
    paddingHorizontal: 12
  }
})

export default FilterModal

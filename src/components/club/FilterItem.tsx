import { StyleSheet } from 'react-native'
import Text from '../common/Text.tsx'
import TouchableScale from '../common/TouchableScale.tsx'
import { SimpleLineIcons } from '../../lib/icon/icons.ts'

interface Props<T extends Record<string, string>> {
  request: T
  filter: keyof T
  filters: Record<keyof T, Record<string, string>>
  filterNames: Record<keyof T, string>
  filterHandler: (filter: keyof T) => void
}

const FilterItem = <T extends Record<string, string>>({
  request,
  filter,
  filters,
  filterNames,
  filterHandler
}: Props<T>) => {
  return (
    <TouchableScale activeScale={0.98} containerStyle={styles.container} onPress={() => filterHandler(filter)}>
      <Text
        style={{
          fontSize: 11,
          fontWeight: 'normal',
          color: 'rgb(30, 30, 30)'
        }}>
        {filterNames[filter]}
        {request[filter] && `: ${filters[filter][request[filter]]}`}
      </Text>
      <SimpleLineIcons name="arrow-down" size={8} />
    </TouchableScale>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginRight: 4,
    paddingVertical: 10,
    paddingHorizontal: 11,
    borderRadius: 18,
    backgroundColor: 'rgb(235, 235, 235)',
    shadowColor: 'rgb(230, 230, 230)',
    shadowOffset: {
      width: 0,
      height: 0.2
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5
  }
})

export default FilterItem

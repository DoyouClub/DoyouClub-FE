import useInput from '../../lib/react/hook/useInput.ts'
import type { ViewStyle } from 'react-native'
import { StyleSheet, View } from 'react-native'
import TextInput from './TextInput.tsx'
import { Ionicons } from '../../lib/icon/icons.ts'
import useDebouncing from '../../lib/react/hook/useDebouncing.ts'

interface Props {
  setText: (text: string) => void
  placeholder: string
  containerStyle?: ViewStyle
}

const SearchBar = ({ setText, placeholder, containerStyle }: Props) => {
  const textInputStates = useInput('text', { maxLength: 30 })
  const { value: text } = textInputStates

  useDebouncing(
    () => {
      setText(text)
    },
    300,
    [text]
  )

  return (
    <View style={[styles.container, containerStyle]}>
      <Ionicons name="search" size={15} color="grey" />
      <TextInput
        states={textInputStates}
        style={{
          width: '90%',
          fontWeight: 'light'
        }}
        maxLength={textInputStates.options?.maxLength}
        placeholder={placeholder}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 42,
    paddingLeft: 12,
    paddingRight: 22,
    borderRadius: 10,
    backgroundColor: 'rgb(235, 235, 235)'
  }
})

export default SearchBar

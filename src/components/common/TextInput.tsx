import type { TextInputProps, TextStyle } from 'react-native'
import { TextInput as RNTextInput } from 'react-native'
import type { Replace } from '../../lib/type/util'
import { fonts, weights } from '../../lib/react/font.ts'
import type { InputStates } from '../../lib/react/hook/useInput.ts'

type Props = Replace<TextInputProps, { style: Replace<TextStyle, { fontWeight?: keyof typeof fonts }> }> & {
  states: InputStates
}

const hitSlop = {
  top: 15,
  left: 10,
  right: 10,
  bottom: 15
} as const

const TextInput = ({ style, states, ...props }: Props) => {
  const { value, setValue, setIsFocused, ref, isMasked, options } = states
  const isDefault = style?.fontFamily === undefined

  return (
    <RNTextInput
      hitSlop={hitSlop}
      placeholderTextColor="grey"
      style={{
        ...style,
        fontWeight: isDefault ? undefined : weights[style.fontWeight ?? 'normal'],
        fontFamily: isDefault ? fonts[style?.fontWeight ?? 'normal'] : style.fontFamily
      }}
      onChangeText={text => {
        setValue?.(text)
        props.onChangeText?.(text)
      }}
      onFocus={e => {
        props.onFocus?.(e)
        setIsFocused(true)
      }}
      onBlur={e => {
        props.onBlur?.(e)
        setIsFocused(false)
      }}
      ref={ref}
      value={value}
      secureTextEntry={isMasked}
      maxLength={options?.maxLength}
      {...props}
    />
  )
}

export default TextInput

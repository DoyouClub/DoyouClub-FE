import type { TextProps, TextStyle } from 'react-native'
import { Text as RNText } from 'react-native'
import { Component } from 'react'
import type { Replace } from '../../lib/type/util'
import { fonts, weights } from '../../lib/react/font.ts'

type Props = Replace<TextProps, { style: Replace<TextStyle, { fontWeight?: keyof typeof fonts }> }>

class Text extends Component<Props> {
  render() {
    const { style, ...props } = this.props
    const isDefault = style?.fontFamily === undefined

    return (
      <RNText
        {...props}
        style={{
          ...style,
          fontWeight: isDefault ? undefined : weights[style.fontWeight ?? 'normal'],
          fontFamily: isDefault ? fonts[style?.fontWeight ?? 'normal'] : style.fontFamily
        }}
      />
    )
  }
}

export default Text

import type { ModalProps as RNModalProps } from 'react-native-modal'
import RNModal from 'react-native-modal'
import type { StyleProp, ViewStyle } from 'react-native'
import { SafeAreaView, View } from 'react-native'
import type { RequiredFields } from '../../lib/type/util'
import type { Dispatch, SetStateAction } from 'react'

type Props = RequiredFields<Partial<RNModalProps>, 'children'> & {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
  containerStyle?: StyleProp<ViewStyle>
  useSafeArea?: boolean
}

const Modal = ({ isVisible, setIsVisible, containerStyle, useSafeArea = false, ...props }: Props) => {
  return (
    <RNModal
      isVisible={isVisible}
      backdropOpacity={0.5}
      animationInTiming={300}
      animationOutTiming={300}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      avoidKeyboard
      onBackdropPress={() => {
        if (props.onBackdropPress) props.onBackdropPress()
        setIsVisible(false)
      }}
      {...props}
      style={[props.style, { margin: 0 }]}>
      {useSafeArea ? (
        <SafeAreaView style={containerStyle}>{props.children}</SafeAreaView>
      ) : (
        <View style={containerStyle}>{props.children}</View>
      )}
    </RNModal>
  )
}

export default Modal

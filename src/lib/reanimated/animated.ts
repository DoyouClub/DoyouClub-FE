import Animated from 'react-native-reanimated'
import Text from '../../components/common/Text.tsx'

const AnimatedView = Animated.View
const AnimatedText = Animated.createAnimatedComponent(Text)

export { AnimatedView, AnimatedText }

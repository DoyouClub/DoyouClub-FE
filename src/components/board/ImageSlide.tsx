import { Dimensions, Image, View } from 'react-native'
import type { Dispatch, SetStateAction } from 'react'
import { useRef } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'

interface Props {
  images: string[]
  index: number
  setIndex: Dispatch<SetStateAction<number>>
}

const ImageSlide = ({ images, index, setIndex }: Props) => {
  const carouselRef = useRef<Carousel<string>>(null)

  return (
    <>
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').width,
          marginBottom: 10
        }}>
        <Carousel
          ref={carouselRef}
          data={images}
          renderItem={({ item }) => <Image src={item} style={{ flex: 1 }} />}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          onSnapToItem={setIndex}
          disableIntervalMomentum
          vertical={false}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          onContentSizeChange={() => carouselRef.current?.snapToItem(index)}
        />
      </View>
      <Pagination
        activeDotIndex={index}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
        dotsLength={images.length}
        containerStyle={{
          paddingVertical: 4
        }}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 18,
          backgroundColor: 'rgb(180, 180, 180)'
        }}
        inactiveDotStyle={{
          width: 6,
          height: 6,
          backgroundColor: 'rgb(200, 200, 200)'
        }}
      />
    </>
  )
}

export default ImageSlide

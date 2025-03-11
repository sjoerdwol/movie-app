//react-native
import { Image, ImageBackground, Text, View } from 'react-native'

//custom images
import { images } from '@/constants/images'

export default function TabIcon({ focused, icon, title }: TabIconProps) {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
      >
        <Image
          source={icon}
          tintColor="#151312"
          className='size-5' />
        <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
      </ImageBackground>
    )
  } else {
    return (
      <View className='size-full justify-center items-center mt-4 rounded-full'>
        <Image
          source={icon}
          tintColor="#A8B5DB"
          className='size-5' />
      </View>
    )
  }
}
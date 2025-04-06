// react native
import { View, Text, Image } from 'react-native'

//custom components, images etc.
import { icons } from '@/constants/icons'

export default function SavedPage() {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <Image
          source={icons.save}
          className='size-10'
          tintColor='#fff'
        />
        <Text className='text-gray-500 text-base'>Watchlist</Text>
      </View>
    </View>
  )
}
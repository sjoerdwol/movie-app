//react-native
import { Image, TextInput, View } from 'react-native'

//custom icons
import { icons } from '@/constants/icons'

export default function SearchBar({ placeholder, onPress }: SearchBarProps) {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image
        source={icons.search}
        className='size-5'
        resizeMode='contain'
        tintColor='#ab8bff'
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=''
        onChangeText={() => { }}
        placeholderTextColor='#a8b5db'
        className='flex-1 ml-2 text-white'
      />
    </View>
  )
}
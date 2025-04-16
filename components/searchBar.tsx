//react-native
import { Image, TextInput, View } from 'react-native'

//custom icons
import { Ionicons } from '@expo/vector-icons'

export default function SearchBar({ placeholder, onPress, value, onChangeText }: SearchBarProps) {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Ionicons
        name='search'
        size={20}
        color={'#ab8bff'}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor='#a8b5db'
        className='flex-1 ml-2 text-white'
      />
    </View>
  )
}
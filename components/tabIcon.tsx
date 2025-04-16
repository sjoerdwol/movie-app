//react-native
import { Image, ImageBackground, Text, View } from 'react-native'

//custom images
import { Ionicons } from '@expo/vector-icons';

export default function TabIcon({ focused, icon }: TabIconProps) {
  if (focused) {
    return (
      <View className='size-full items-center justify-center mt-6 rounded-full'>
        <Ionicons
          name={icon}
          size={24}
          color={'#AB8BFF'}
        />
      </View>
    )
  } else {
    return (
      <View className='size-full justify-center items-center mt-6 rounded-full'>
        <Ionicons
          name={icon}
          size={24}
          color={"#A8B5DB"}
        />
      </View>
    )
  }
}
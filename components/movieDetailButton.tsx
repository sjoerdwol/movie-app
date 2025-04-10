// react native
import { Image, Text, TouchableOpacity } from 'react-native';

export default function MovieDetailButton({ onPress, icon, rotateIcon, text }: MovieDetailButtonProps) {
  return (
    <TouchableOpacity
      className='left-0 right-0 mx-5 mt-10 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50 w-[40%]'
      onPress={onPress}
    >

      {rotateIcon ? (
        <Image
          source={icon}
          className='size-5 mr-1 mt-0.5 rotate-180'
          tintColor="#fff"
        />
      ) : (
        <Image
          source={icon}
          className='size-5 mr-1 mt-0.5'
          tintColor="#fff"
        />
      )}

      <Text className='text-white font-semibold text-base'>{text}</Text>
    </TouchableOpacity>
  )
}
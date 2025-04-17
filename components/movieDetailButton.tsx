// react native
import { Text, TouchableOpacity } from 'react-native';

// icons
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function MovieDetailButton({ onPress, icon, text }: MovieDetailButtonProps) {
  return (
    <TouchableOpacity
      className='left-0 right-0 mx-5 mt-10 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50 w-[40%]'
      onPress={onPress}
    >
      {icon === 'logout' || icon === 'login' ? (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          className='mr-2 mt-0.5'
          color={'#fff'}
        />
      ) : (
        <Ionicons
          name={icon}
          size={20}
          className='mt-0.5'
          color={'#fff'}
        />
      )}
      {icon === 'logout' || icon === 'login' ? (<Text className='text-white font-semibold text-base'>{text}</Text>) : (<></>)}
    </TouchableOpacity>
  )
}
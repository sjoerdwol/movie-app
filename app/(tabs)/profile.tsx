// react native
import { View, Text, Image } from 'react-native';

//custom components, images etc.
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import MovieDetailButton from '@/components/movieDetailButton';
import SigninComponent from '@/components/signinComponent';

import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { session, user, signout } = useAuth();

  return (
    <>
      {session ? (
        <View className="flex-1 bg-primary">
          <Image
            source={images.bg}
            className='absolute w-full z-0'
          />
          <Image
            source={icons.logo}
            className="w-12 h-10 mt-20 mb-5 mx-auto"
          />
          <View className='px-5'>
            <View className='items-center'>
              <Text className="text-2xl text-white font-bold mt-10">{user?.name}</Text>
            </View>
            <View className=''>
              <Text className='text-xl text-white font-bold mt-8'>Favorite Movie</Text>
              <Text className='text-lg text-gray-400 font-bold mt-8'>Watchlisted movies: 8</Text>
            </View>
            <View className='items-center'>
              <MovieDetailButton icon={icons.person} onPress={signout} rotateIcon={false} text='Sign out' />
            </View>
          </View>
        </View>
      ) : (
        <SigninComponent />
      )}
    </>
  )
}
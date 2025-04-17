// react + react native
import { useCallback } from 'react';
import { View, Text, Image } from 'react-native';

// expo
import { useFocusEffect } from 'expo-router';

// service calls
import { useAuth } from '@/context/AuthContext';
import { getUserWatchlist, getFavorite } from '@/services/appwrite_db';
import useFetch from '@/services/useFetch';

//custom components, images etc.
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import MovieDetailButton from '@/components/movieDetailButton';
import SigninComponent from '@/components/signinComponent';
import WatchlistMovieCard from '@/components/watchlistMovieCard';

export default function ProfilePage() {
  const { session, user, signout } = useAuth();
  const { data: watchlist, fetchData: refetchWatchlist } = useFetch(() => getUserWatchlist(user), false);
  const { data: favorite, fetchData: refetchFavorite } = useFetch(() => getFavorite(user), false);

  const props: WatchlistMovie = {
    movieId: favorite?.movieId,
    title: favorite?.title,
    poster_url: favorite?.poster_url
  }

  // refetches user data each time the page gets focused IF a session is available
  useFocusEffect(
    useCallback(() => {
      if (session) {
        refetchFavorite();
        refetchWatchlist();
      }
    }, [])
  );

  return (
    <>
      {session && user ? (
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
              <Text className="text-2xl text-white font-bold mt-10">{user.name}</Text>
            </View>
            <View className=''>
              <Text className='text-xl text-white font-bold mt-8 mb-5'>Favorite Movie</Text>
              {favorite && <WatchlistMovieCard {...props} />}
              {watchlist && <Text className='text-lg text-gray-400 font-bold mt-5'>Watchlisted movies: {watchlist.length}</Text>}
            </View>
            <View className='items-center'>
              <MovieDetailButton icon={'logout'} onPress={signout} text='Sign out' />
            </View>
          </View>
        </View>
      ) : (
        <SigninComponent />
      )}
    </>
  )
}
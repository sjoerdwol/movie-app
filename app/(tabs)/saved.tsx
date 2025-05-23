// react + react native
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';

// expo
import { useFocusEffect } from 'expo-router';

// service calls
import { getUserWatchlist } from '@/services/appwrite_db';
import { useAuth } from '@/context/AuthContext';
import useFetch from '@/services/useFetch';

//custom components, images etc.
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import SigninComponent from '@/components/signinComponent';
import WatchlistMovieCard from '@/components/watchlistMovieCard';

export default function SavedPage() {
  const { session, user } = useAuth();
  const { data: watchlist, loading: watchlistLoading, error: watchlistError, fetchData: refetchWatchlist } = useFetch(() => getUserWatchlist(user), false);

  // refetches the watchlist each time the page gets focused IF a session is available
  useFocusEffect(
    useCallback(() => {
      if (session) {
        refetchWatchlist();
      }
    }, [])
  );

  return (
    <>
      {session ? (
        <View className='flex-1 bg-primary'>
          <Image
            source={images.bg}
            className='absolute w-full z-0'
          />
          <ScrollView
            className='flex-1 px-5'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
          >
            {watchlistLoading ? (
              <ActivityIndicator
                size="large"
                color='#0000ff'
                className="mt-10 self-center"
              />
            ) : watchlistError ? (
              <Text>{watchlistError?.message}</Text>
            ) : (
              <View>
                <Image
                  source={icons.logo}
                  className="w-12 h-10 mt-20 mb-5 mx-auto"
                />
                <Text className="text-lg text-white font-bold mt-5 mb-3">My Watchlist</Text>
                <FlatList
                  data={watchlist}
                  keyExtractor={(item) => item.movieId.toString()}
                  renderItem={({ item }) => <WatchlistMovieCard {...item} />}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 20,
                    paddingHorizontal: 5,
                    marginBottom: 10
                  }}
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                />
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <SigninComponent />
      )}
    </>
  )
}
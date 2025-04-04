//react + react-native
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

//service calls
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from '@/services/appwrite';
import useFetch from "@/services/useFetch";

//custom components, images etc.
import MovieCard from '@/components/movieCard'
import SearchBar from '@/components/searchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: movies, loading: moviesLoading, error: moviesError, fetchData, reset } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const func = setTimeout(async () => {
      if (searchQuery.trim()) {
        await fetchData();
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(func);
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);

  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className='flex-1 absolute w-full z-0'
        resizeMode='cover'
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard {...item} />}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 20,
          paddingHorizontal: 5,
          marginBottom: 10
        }}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 mb-5 items-center'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>
            <View className='mt-5'>
              <SearchBar
                placeholder='Search movies...'
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator
                size='large'
                color='#0000ff'
                className='my-3'
              />
            )}

            {moviesError && (
              <Text className='text-red-500 px-5 my-3'>Error: {moviesError.message}</Text>
            )}

            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Search Results for{' '}
                <Text className='text-accent'>{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListHeaderComponentStyle={{
          marginBottom: 7
        }}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}
// react native
import { Image, ScrollView, Text, View } from 'react-native'

// expo
import { router, useLocalSearchParams } from 'expo-router'

//service calls
import { addToWatchlist, checkIfMovieOnWatchlist, removeFromWatchlist } from '@/services/appwrite';
import { fetchMovieDetails } from '@/services/api';
import useFetch from "@/services/useFetch";

//custom components, images etc.
import { icons } from "@/constants/icons";
import MovieInfo from '@/components/movieInfo';
import MovieDetailButton from '@/components/movieDetailButton';

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const { data: movie } = useFetch(() => fetchMovieDetails(id as string));
  const { data: isSaved, fetchData: refetchIsSaved } = useFetch(() => checkIfMovieOnWatchlist(id as string));

  const toggleSave = async () => {
    if (isSaved) {
      await removeFromWatchlist(id as string);
    } else {
      await addToWatchlist(id as string, movie?.title as string, movie?.poster_path as string);
    }
    await refetchIsSaved();
  }

  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
            className='w-full h-[500px]'
          />
        </View>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{movie?.title}</Text>

          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-light-200 text-sm'>{movie?.release_date.split('-')[0]},</Text>
            <Text className='text-light-200 text-sm'>{movie?.runtime}min</Text>
          </View>
          <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
            <Image
              source={icons.star}
              className='size-4'
            />
            <Text className='text-white font-bold text-sm'>{Math.round(movie?.vote_average ?? 0)} / 10</Text>
            <Text className='text-light-200 text-sm'>({movie?.vote_count} votes)</Text>
          </View>
          <MovieInfo label='Overview' value={movie?.overview} />
          <MovieInfo label='Genres' value={movie?.genres.map((g) => g.name).join(' | ') || 'N/A'} />
          <View className='flex-row justify-between w-1/2'>
            <MovieInfo label='Budget' value={`$${movie?.budget as number / 1000000} million`} />
            <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue as number / 1000000)} million`} />
          </View>
          <MovieInfo label='Production Companies' value={movie?.production_companies.map((c) => c.name).join(' - ') || 'N/A'} />
        </View>
        <View className='flex flex-row justify-around'>
          <MovieDetailButton
            onPress={router.back}
            icon={icons.arrow}
            rotateIcon={true}
            text='Go back'
          />
          <MovieDetailButton
            onPress={() => { toggleSave() }}
            icon={icons.save}
            rotateIcon={false}
            text={isSaved ? 'Remove' : 'Save'}
          />
        </View>
      </ScrollView>
    </View>
  )
}
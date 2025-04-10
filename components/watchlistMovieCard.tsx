//react native
import { Image, Text, TouchableOpacity } from 'react-native';

//expo
import { Link } from 'expo-router';

export default function WatchlistMovieCard({ movieId, title, poster_url }: WatchlistMovie) {
  return (
    <Link href={`/movies/${movieId}`} asChild>
      <TouchableOpacity className='w-[30%]'>
        <Image
          source={{
            uri: poster_url
              ? `https://image.tmdb.org/t/p/w500${poster_url}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
          }}
          className='w-full h-52 rounded-lg'
          resizeMode='cover'
        />
        <Text
          className='text-sm font-bold text-white mt-2'
          numberOfLines={1}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  )
}
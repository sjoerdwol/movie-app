//react-native
import { Image, Text, TouchableOpacity, View } from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view';

//expo
import { Link } from 'expo-router'

//custom images
import { images } from '@/constants/images';

export default function TrendingCard({ movie: { movie_id, title, poster_url }, index }: TrendingCardProps) {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className='w-32 relative pl-5'>
        <Image
          source={{ uri: poster_url }}
          className='w-32 h-48 rounded-lg'
          resizeMode='cover'
        />

        <View className='absolute bottom-0.5 -left-1 px-2 py-1 rounded-full'>
          <MaskedView maskElement={
            <Text className="font-bold text-white text-5xl">
              {index + 1}
            </Text>
          }>
            <Image
              source={images.rankingGradient}
              className='size-14'
              resizeMode='cover'
            />
          </MaskedView>
        </View>

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
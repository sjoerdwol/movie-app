//react-native
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

//expo
import { useRouter } from "expo-router";

//service calls
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";

//custom components, images etc.
import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

export default function Index() {
  const router = useRouter();
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color='#0000ff'
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError.message}</Text>
        ) : (
          <View>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
            />
            <View className="flex-1 mt-5 ">
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for a movie"
              />
              <>
                <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
                <FlatList
                  data={movies}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <MovieCard {...item} />}
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
              </>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

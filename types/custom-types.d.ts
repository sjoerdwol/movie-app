type Movie = {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type TrendingMovie = {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

type MovieDetails = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

type TrendingCardProps = {
  movie: TrendingMovie;
  index: number;
}

type SearchBarProps = {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (string) => void
}

type TabIconProps = {
  focused: boolean;
  icon: any;
}

type MovieInfoProps = {
  label: string;
  value?: string | number | null;
}

type MovieDetailButtonProps = {
  onPress: () => void;
  icon: any;
  text: string;
}

type WatchlistMovie = {
  movieId: number;
  title: string;
  poster_url: string;
}

type AuthContextProps = {
  children: React.ReactNode
}

type AuthentificationContext = {
  session: Models.Session | null,
  user: Models.User<Models.Preferences> | null,
  signin: (email: string, password: string) => void,
  signout: () => void
}
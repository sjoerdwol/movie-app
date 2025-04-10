type SearchBarProps = {
  placeholder: string,
  onPress?: () => void,
  value?: string,
  onChangeText?: (string) => void
}

type TabIconProps = {
  focused: boolean,
  icon: any,
  title: string
}

type MovieInfoProps = {
  label: string,
  value?: string | number | null
}

type MovieDetailButtonProps = {
  onPress: () => void,
  icon: any,
  rotateIcon: boolean,
  text: string
}

type WatchlistMovie = {
  movieId: number,
  title: string,
  poster_url: string
}
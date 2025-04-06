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
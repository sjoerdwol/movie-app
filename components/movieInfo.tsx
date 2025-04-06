// react native
import { Text, View } from "react-native";

export default function MovieInfo({ label, value }: MovieInfoProps) {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 font-normal text-sm">
        {label}
      </Text>
      <Text className="text-light-100 font-bold text-sm">
        {value || 'N/A'}
      </Text>
    </View>
  )
}
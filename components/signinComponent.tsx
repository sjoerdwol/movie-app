// react + react native
import { useState } from "react";
import { Image, TextInput, View } from "react-native";

// service calls
import { useAuth } from "@/context/AuthContext";

// icons and components
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import MovieDetailButton from "./movieDetailButton";

export default function SigninComponent() {
  const { signin } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleOnPress = () => {
    signin(email, password);
  };

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className='absolute w-full z-0'
      />
      <Image
        source={icons.logo}
        className="w-12 h-10 mt-20 mx-auto"
      />
      <View className='items-center px-5 mt-36'>
        <TextInput
          className="w-[75%] h-14 border-t border-s border-b border-e border-accent rounded-full text-center text-white mb-5"
          placeholder="Enter your email .."
          placeholderTextColor='#a8b5db'
          value={email}
          onChangeText={(text: string) => setEmail(text)}
        />
        <TextInput
          className="w-[75%] h-14 border-t border-s border-b border-e border-accent rounded-full text-center text-white"
          placeholder="Enter your password .."
          placeholderTextColor='#a8b5db'
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />
        <MovieDetailButton
          onPress={handleOnPress}
          icon={'login'}
          text='Sign In'
        />
      </View>
    </View>
  )
}
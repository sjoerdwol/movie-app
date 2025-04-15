import { Image, TextInput, View } from "react-native";

import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { useAuth } from "@/context/AuthContext";
import MovieDetailButton from "./movieDetailButton";
import { useState } from "react";

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
          className="w-[75%] border-2 border-accent rounded-lg text-center text-white mb-5"
          placeholder="Enter your email .."
          placeholderTextColor='white'
          value={email}
          onChangeText={(text: string) => setEmail(text)}
        />
        <TextInput
          className="w-[75%] border-2 border-accent rounded-lg text-center text-white"
          placeholder="Enter your password .."
          placeholderTextColor='white'
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />
        <MovieDetailButton
          onPress={handleOnPress}
          icon={icons.person}
          rotateIcon={false}
          text='Sign In'
        />
      </View>
    </View>
  )
}
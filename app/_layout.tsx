//react-native
import { StatusBar } from "react-native";

//expo
import { Stack } from "expo-router";

//tailwind declarations
import "./globals.css"

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="movies/[id]" />
      </Stack>
    </>
  );
}

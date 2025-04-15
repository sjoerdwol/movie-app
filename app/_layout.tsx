//react-native
import { StatusBar } from "react-native";

//expo
import { Stack } from "expo-router";

//tailwind declarations
import "./globals.css"

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="movies/[id]" />
      </Stack>
    </AuthProvider>
  );
}

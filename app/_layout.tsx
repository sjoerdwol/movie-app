//react-native
import { StatusBar } from "react-native";

//expo
import { Stack } from "expo-router";

//tailwind declarations
import "./globals.css"

import { AuthProvider } from "@/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar hidden={true} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="movies/[id]" />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

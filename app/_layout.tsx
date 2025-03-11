//react-native
import { SafeAreaProvider } from "react-native-safe-area-context";

//expo
import { Stack } from "expo-router";

//tailwind declarations
import "./globals.css"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="movies/[id]" />
      </Stack>
    </SafeAreaProvider>
  );
}

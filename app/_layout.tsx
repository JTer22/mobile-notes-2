import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NotesProvider } from "../src/_context/NotesContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotesProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </NotesProvider>
    </GestureHandlerRootView>
  );
}

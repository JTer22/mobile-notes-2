import { Stack } from "expo-router";
import { NotesProvider } from "../src/_context/NotesContext";

export default function RootLayout() {
  return (
    <NotesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </NotesProvider>
  );
}

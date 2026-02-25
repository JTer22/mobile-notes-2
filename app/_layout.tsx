import { Stack } from "expo-router";
import { NotesProvider } from "./context/NotesContext";

export default function RootLayout() {
  return (
    <NotesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </NotesProvider>
  );
}

import { AppProvider } from "@/context/AppContext";
import { Stack } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="questions/index" options={{ headerTitle: 'Questions' }} />
        <Stack.Screen name="questions/ask" options={{ headerTitle: 'Ask a Question' }} />
        <Stack.Screen name="questions/[id]" options={{ headerTitle: 'Question Detail' }} />
      </Stack>
    </AppProvider>
  );
}

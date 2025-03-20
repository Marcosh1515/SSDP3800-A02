import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'SSDP3800-A02 Pokedex',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="(screens)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}

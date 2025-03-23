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
            title: 'SSDP3800-A02 Pokédex',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="pokemon/[id]"
          options={() => ({
            title: 'Details',
            headerShown: true,
            headerBackTitle: 'Back',
          })}
        />
      </Stack>
    </>
  );
}

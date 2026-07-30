import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="detalle"
        options={{
          headerShown: true,
          title: "Detalle del usuario",
        }}
      />
      <Stack.Screen
        name="actualizar"
        options={{
          headerShown: true,
          title: "Actualizar Usuario",
        }}
      />
    </Stack>
  );
}
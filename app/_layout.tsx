import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar hidden={true}/>
          <Stack> 
            <Stack.Screen name="index" options={{ headerShown:false }}/>
            <Stack.Screen name="ambilfoto" options={{ headerShown:false }} />
            <Stack.Screen name="hasilidentifikasi" options={{ headerShown:false }} />
            <Stack.Screen name="unggahgambar" options={{ headerShown:false }} />
            <Stack.Screen name="jenismangrove" options={{ headerShown:false }} />
            <Stack.Screen name="jenismangrove/[id]" options={{ headerShown:false }} />
            <Stack.Screen name="developer" options={{ headerShown:false }} />
          </Stack>
    </SafeAreaProvider>
  
  );
}

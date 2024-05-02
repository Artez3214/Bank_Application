import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { isLoaded, useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { ClerkProvider, useAuth } from "@clerk/clerk-expo"
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
import * as SecureStore from 'expo-secure-store';
import { StatusBar, Text, TouchableOpacity } from 'react-native';
const queryClient = new QueryClient();
// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};



import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserInactivityProvider } from './context/UserInactivity';

export {
  ErrorBoundary,
} from 'expo-router';


SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const { isLoaded, isSignedIn } = useAuth();



  const router = useRouter();
  const segments = useSegments();
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  useEffect(() => {
    console.log('isSignedIn', isSignedIn);
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(authentication)';

    if (isSignedIn && !inAuthGroup) {
      router.replace('/authentication/(tabs)/home');
    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn]); 
  <Stack.Screen name="(authenticated)/(modals)/lock" options={{
      headerShown: false, animation:  'none' }} />
  if (!loaded || !isLoaded) {
    return <Text>Loading.....</Text>;
  }
  

  return (<Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="signup" options={{
      headerShown: false,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: Colors.background }
    }} />
    <Stack.Screen name="login" options={{
      headerShown: false,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: Colors.background }
    }} />
    <Stack.Screen name="verificationPhone/[phone]" options={{
      headerShown: false,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: Colors.background },
      headerLeft: () => (
        <TouchableOpacity onPress={router.back}>
          <Ionicons name="arrow-back" size={34} color={Colors.dark} />
        </TouchableOpacity>
      ),
    }} />
      <Stack.Screen name="verificationEmail/[email]" options={{
      headerShown: false,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: Colors.background },
      headerLeft: () => (
        <TouchableOpacity onPress={router.back}>
          <Ionicons name="arrow-back" size={34} color={Colors.dark} />
        </TouchableOpacity>
      ),
    }} />
   <Stack.Screen name="authentication/(tabs)" options={{headerShown:false}}/>
  </Stack>);
};
const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <UserInactivityProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar />
            <InitialLayout />
          </GestureHandlerRootView>
        </UserInactivityProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayoutNav;

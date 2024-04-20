import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import {ClerkProvider, useAuth} from "@clerk/clerk-expo"
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
import * as SecureStore from 'expo-secure-store';
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

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const  InitialLaayout = () => {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const {isLoaded, isSignedIn} = useAuth();

  const router= useRouter();
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
      console.log('isSignedIn', isSignedIn);
  }, [isSignedIn]);

  if (!loaded) {
    return null;
  }

  return     (<Stack>
  <Stack.Screen name = "index" options={{headerShown: false}}/>
  <Stack.Screen name = "signup" options={{headerShown: false,
    headerShadowVisible: false,
    headerStyle:{ backgroundColor: Colors.background}
  }}/>
    <Stack.Screen name = "login" options={{headerShown: false,
    headerShadowVisible: false,
    headerStyle:{ backgroundColor: Colors.background}
  }}/>
   <Stack.Screen name = "verification/[phone]" options={{headerShown: false,
    headerShadowVisible: false,
    headerStyle:{ backgroundColor: Colors.background}
  }}/>
</Stack>);
};

const RootLayoutNav = () =>{
  
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
    <InitialLaayout/>
    </ClerkProvider>
  );
}

export default RootLayoutNav;

// FitzFrontend/app/_layout.tsx
import React, { useEffect, useState } from 'react';
import { SplashScreen, Stack } from 'expo-router'; // Stack is imported from expo-router
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Colors } from '../constants/Colours';
import { ActivityIndicator, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [user, setUser] = useState<any>(null);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAppReady(true);
      SplashScreen.hideAsync();
    });

    return () => unsubscribe();
  }, []);

  if (!appReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        // User is logged in, show main tabs
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        // User is not logged in, show auth flow, starting with 'login'
        <Stack initialRouteName="login"> {/* Explicitly set initialRouteName */}
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          {/* Add other auth screens like password reset here */}
        </Stack>
      )}
    </Stack>
  );
}
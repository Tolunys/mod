import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LanguageProvider } from './app/context/LanguageContext';
import { MoodProvider } from './app/context/MoodContext';
import LanguageSelectScreen from './app/screens/LanguageSelectScreen';
import CalmDotScreen from './app/screens/CalmDotScreen';
import MoodSwipeScreen from './app/screens/MoodSwipeScreen';
import MicroTherapyScreen from './app/screens/MicroTherapyScreen';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <LanguageProvider>
        <MoodProvider>
          <NavigationContainer>
            <StatusBar style="dark" />
            <Stack.Navigator
              initialRouteName="LanguageSelect"
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#F7F7FA' },
              }}
            >
              <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
              <Stack.Screen name="CalmDot" component={CalmDotScreen} />
              <Stack.Screen name="MoodSwipe" component={MoodSwipeScreen} />
              <Stack.Screen name="MicroTherapy" component={MicroTherapyScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </MoodProvider>
      </LanguageProvider>
    </View>
  );
}

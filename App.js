import React, { useEffect, useContext, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './components/DrawerNavigator';
import LoginScreen from './components/LoginScreen';
import Main from './components/Main';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Font from 'expo-font'; // Import expo-font
import * as SplashScreen from 'expo-splash-screen'; // Import expo-splash-screen
import './i18n';
import 'intl-pluralrules';
import { ThemeProvider, ThemeContext } from './src/contexts/ThemeContext'; 

const Stack = createNativeStackNavigator();

// Function to load custom fonts
const loadFonts = async () => {
  await Font.loadAsync({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'), // Ensure the path is correct
  });
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false); // State to track font loading

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync(); // Prevent splash screen from auto-hiding
      await loadFonts(); // Load fonts
      setFontsLoaded(true); // Set fontsLoaded to true once fonts are loaded
      await SplashScreen.hideAsync(); // Hide splash screen
    };

    prepare(); // Call the prepare function
  }, []);

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

const AppContent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme}>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

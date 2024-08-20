// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './components/DrawerNavigator';
import LoginScreen from './components/LoginScreen';
import Main from './components/Main';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as ScreenOrientation from 'expo-screen-orientation';
import './i18n'; // Import i18n configuration
import 'intl-pluralrules'; // Import the polyfill


const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
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

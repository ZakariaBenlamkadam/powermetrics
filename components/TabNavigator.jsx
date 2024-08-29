import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Statistics from './Statistics';
import MyMapComponent from './MyMapComponent';
import Trends from './Trends';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../src/contexts/ThemeContext'; // Import ThemeContext

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme === 'light' ? '#2E8B57' : '#333', // Green for light theme, dark grey for dark theme
        },
        tabBarActiveTintColor: theme === 'light' ? 'black' : 'white', // Black for light theme, white for dark theme
        tabBarInactiveTintColor: theme === 'light' ? 'white' : '#aaa', // White for light theme, light grey for dark theme
      }}
    >
      <Tab.Screen 
        name="Map" 
        component={MyMapComponent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="globe" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Statistics" 
        component={Statistics} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="line-chart" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Trends" 
        component={Trends} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="rocket" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

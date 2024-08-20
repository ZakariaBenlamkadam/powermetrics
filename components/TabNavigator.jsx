import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Statistics from './Statistics';
import MyMapComponent from './MyMapComponent';
import Trends from './Trends';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2E8B57', 
        },
        tabBarActiveTintColor: 'black', 
        tabBarInactiveTintColor: 'white', 
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

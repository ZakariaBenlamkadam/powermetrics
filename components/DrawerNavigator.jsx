import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator'; 
import SettingsScreen from './SettingsScreen'; 
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../src/contexts/ThemeContext'; // Import ThemeContext

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext); 

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const CustomDrawerContent = (props) => (
    <View style={[styles.drawerContent, { backgroundColor: theme === 'light' ? '#fff' : '#333' }]}>
      <Text style={[styles.drawerTitle, { color: theme === 'light' ? '#000' : '#fff' }]}>{t('Menu')}</Text>
      <DrawerItemList {...props} />
      <View style={[styles.bottomDrawerSection, { borderTopColor: theme === 'light' ? '#f4f4f4' : '#555' }]}>
        <DrawerItem
          label={t('settings')}
          labelStyle={{ color: theme === 'light' ? '#000' : '#fff' }}
          onPress={() => props.navigation.navigate('Settings')}
        />
        <DrawerItem
          label={t('Logout')}
          labelStyle={{ color: theme === 'light' ? '#000' : '#fff' }}
          onPress={handleLogout}
        />
      </View>
    </View>
  );

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme === 'light' ? '#fff' : '#333',
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 18,
          color: theme === 'light' ? '#000' : '#fff',
        },
        drawerActiveTintColor: '#e91e63',
        drawerInactiveTintColor: theme === 'light' ? '#000' : '#fff',
        drawerItemStyle: {
          marginVertical: 1,
        },
        headerStyle: {
          backgroundColor: theme === 'light' ? '#fff' : '#333',
        },
        headerTintColor: theme === 'light' ? '#000' : '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen 
        name="Tabs" 
        component={TabNavigator} 
        options={{ title: t('AlOmrane') }} 
      />
      
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: t('settings'), 
          drawerItemStyle: { display: 'none' } 
        }} 
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  bottomDrawerSection: {
    marginTop: 'auto',
    borderTopWidth: 1,
    paddingVertical: 5,
  },
});

export default DrawerNavigator;

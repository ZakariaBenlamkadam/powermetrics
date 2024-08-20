import React from 'react';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator'; 
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen'; 
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const CustomDrawerContent = (props) => (
    <View style={styles.drawerContent}>
      <Text style={styles.drawerTitle}>{t('Menu')}</Text>
      <DrawerItemList {...props} />
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          label={t('settings')}
          onPress={() => props.navigation.navigate('Settings')}
        />
        <DrawerItem
          label={t('Logout')}
          labelStyle={styles.drawerItemText}
          onPress={handleLogout}
        />
      </View>
    </View>
  );

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 18,
        },
        drawerActiveTintColor: '#e91e63',
        drawerInactiveTintColor: '#000',
        drawerItemStyle: {
          marginVertical: 1,
        },
        headerStyle: {
          backgroundColor: 'white', 
        },
        headerTintColor: '#000',
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
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ title: t('Home') }} 
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
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    paddingVertical: 5,
  },
});

export default DrawerNavigator;

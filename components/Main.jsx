// Main.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, SafeAreaView, Image } from 'react-native';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Main = ({ navigation }) => {
  const { t } = useTranslation(); 

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <StatusBar style="auto" />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/al-omrane.png')}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('DrawerNavigator')}
        style={{ backgroundColor: '#28a745', padding: 20, width: '90%', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}
      >
        <Text style={{ color: 'white', fontSize: 18, width: 200, height: 50, marginTop: 20, fontWeight: 'bold' }}>
          {t('letsBegin')} {/* Use translation key */}
        </Text>
        <Image
          source={require('../assets/right-arrow.png')}
          style={{ width: 50, height: 50, marginTop: 15 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Main;

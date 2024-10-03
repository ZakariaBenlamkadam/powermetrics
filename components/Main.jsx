import React, { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, View, SafeAreaView, Image, Modal, TouchableWithoutFeedback, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../src/contexts/ThemeContext'; 

const Main = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext); 
  const [modalVisible, setModalVisible] = useState(false);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setModalVisible(false);
  };

  const handleOutsidePress = () => {
    setModalVisible(false);
  };

  // Determine styles based on theme
  const backgroundColor = theme === 'light' ? '#fff' : '#000';
  const textColor = '#000';

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor }}>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      <View style={{ position: 'absolute', top: 60, right: 20, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={theme === 'light' ? require('../assets/translate.png') : require('../assets/translate light.png')}
            style={{ width: 30, height: 30, marginRight: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleTheme}>
          <Image
            source={theme === 'light' ? require('../assets/night-mode.png') : require('../assets/light-mode.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <TouchableWithoutFeedback>
              <View style={{ width: 200, backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: textColor }}>
                  {t('chooseLanguage')}
                </Text>
                <TouchableOpacity 
                  onPress={() => handleLanguageChange('en')} 
                  style={{ alignItems: 'center', paddingVertical: 10 }}
                >
                  <Text style={{ fontSize: 16, color: textColor }}>English</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => handleLanguageChange('fr')} 
                  style={{ alignItems: 'center', paddingVertical: 10 }}
                >
                  <Text style={{ fontSize: 16, color: textColor }}>Français</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => handleLanguageChange('ar')} 
                  style={{ alignItems: 'center', paddingVertical: 10 }}
                >
                  <Text style={{ fontSize: 16, color: textColor }}>العربية</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={theme === 'light' ? require('../assets/al-omrane.png') : require('../assets/al-omrane light.png')}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={{ backgroundColor: theme === 'light' ? '#28a745' : '#c9f7f2', padding: 20, width: '90%', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}
      >
        <Text style={{ color: theme === 'light' ? 'white' : '#000', fontSize: 18, width: 200, height: 50, marginTop: 20, fontWeight: 'bold'}}>
          {t('letsBegin')}
        </Text>
        <Image
          source={theme === 'light' ? require('../assets/right-arrow.png') : require('../assets/right-arrow black.png')}
          style={{ width: 50, height: 50, marginTop: 15 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Main;

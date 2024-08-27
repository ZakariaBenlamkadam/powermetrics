import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, SafeAreaView, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';

const Main = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setModalVisible(false);
  };

  const handleOutsidePress = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <StatusBar style="auto" />
      <View style={{ position: 'absolute', top: 60, right: 20 }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require('../assets/translate.png')}
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
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
                  {t('chooseLanguage')}
                </Text>
                <TouchableOpacity 
                  onPress={() => handleLanguageChange('en')} 
                  style={{ alignItems: 'center', paddingVertical: 10 }}
                >
                  <Text style={{ fontSize: 16 }}>English</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => handleLanguageChange('fr')} 
                  style={{ alignItems: 'center', paddingVertical: 10 }}
                >
                  <Text style={{ fontSize: 16 }}>Français</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => handleLanguageChange('ar')} 
                  style={{ alignItems: 'center', paddingVertical: 10 }}
                >
                  <Text style={{ fontSize: 16 }}>العربية</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/al-omrane.png')}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={{ backgroundColor: '#28a745', padding: 20, width: '90%', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}
      >
        <Text style={{ color: 'white', fontSize: 18, width: 200, height: 50, marginTop: 20, fontWeight: 'bold'}}>
          {t('letsBegin')}
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

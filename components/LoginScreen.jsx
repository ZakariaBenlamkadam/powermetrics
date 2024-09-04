import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, Text, View, Image, ImageBackground, Modal, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../src/contexts/ThemeContext'; 

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext); 

  const handleLogin = () => {
    if (username === '' || password === '') {
      Alert.alert(t('Error'), t('Please fill in all fields.'));
    } else if (username === 'Admin' && password === 'Admin') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigator' }],
      });
    } else {
      Alert.alert(t('Error'), t('Invalid username or password.'));
    }
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setModalVisible(false);
  };

  const handleOutsidePress = () => {
    setModalVisible(false);
  };
  const textColor = theme === 'light' ? '#000' : '#fff';
  const backgroundColor = theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
  const inputBackgroundColor = theme === 'light' ? '#f9f9f9' : '#333';
  const inputBorderColor = theme === 'light' ? '#444' : '#bbb';

  return (
    <ImageBackground source={require('../assets/back.png')} style={styles.backgroundImage}>
      {theme === 'dark' && <View style={styles.darkOverlay} />}
      <SafeAreaView style={styles.container}>
        <View style={styles.headerIconsContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={theme === 'light' ? require('../assets/translate.png') : require('../assets/translate light.png')}
              style={styles.languageIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleTheme}>
            <Image
              source={theme === 'light' ? require('../assets/night-mode.png') : require('../assets/light-mode.png')}
              style={styles.themeIcon}
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
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>{t('chooseLanguage')}</Text>
                  <TouchableOpacity 
                    onPress={() => handleLanguageChange('en')} 
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>English</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleLanguageChange('fr')} 
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>Français</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleLanguageChange('ar')} 
                    style={styles.modalButton}
                  >
                    <Text style={styles.modalButtonText}>العربية</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={styles.innerContainer}>
          <Image source={theme === 'light' ? require('../assets/al-omrane.png') : require('../assets/al-omrane dark.png')} style={styles.logo} />
          <Text style={[styles.header, { color: 'black' }]}>{t('Sign in to your account')}</Text>

          <TextInput
            style={[styles.input, { backgroundColor: inputBackgroundColor, borderColor: inputBorderColor, color: textColor }]}
            placeholder={t('Username')}
            keyboardType="default"
            value={username}
            placeholderTextColor={theme === 'light' ? '#777' : '#aaa'}
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={[styles.input, { backgroundColor: inputBackgroundColor, borderColor: inputBorderColor, color: textColor }]}
            placeholder={t('Password')}
            secureTextEntry
            value={password}
            placeholderTextColor={theme === 'light' ? '#777' : '#aaa'}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={handleLogin} style={{backgroundColor: theme === 'light' ? '#28a745':'#265c66' , paddingVertical: 10,borderRadius: 5, alignItems: 'center',NmarginBottom: 20}}>
            <Text style={{color: theme === 'light' ? 'white': '#bbb',fontWeight: 'bold',}}>{t('Log in')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconsContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    flexDirection: 'row',
  },
  languageIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  themeIcon: {
    width: 30,
    height: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 200,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalButtonText: {
    fontSize: 16,
  },
  innerContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: '80%',
    borderRadius: 10,
  },
  logo: {
    width: 165,
    height: 125,
    marginBottom: 20,
    alignSelf: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#444',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;

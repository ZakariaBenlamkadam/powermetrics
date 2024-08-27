import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, Text, View, Image, ImageBackground, Modal, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { t, i18n } = useTranslation();

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

  return (
    <ImageBackground source={require('../assets/back.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.languageIconContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require('../assets/translate.png')}
              style={styles.languageIcon}
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
          <Image source={require('../assets/al-omrane.png')} style={styles.logo} />
          <Text style={styles.header}>{t('Sign in to your account')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('Username')}
            keyboardType="default"
            value={username}
            placeholderTextColor="#777"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder={t('Password')}
            secureTextEntry
            value={password}
            placeholderTextColor="#777"
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{t('Log in')}</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageIconContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  languageIcon: {
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
  loginButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;

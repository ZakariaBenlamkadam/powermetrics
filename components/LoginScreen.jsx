import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert, Text, View, Image, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

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

  return (
    <ImageBackground source={require('../assets/back.png')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <Image source={require('../assets/al-omrane.png')} style={styles.logo} />
          <Text style={styles.header}>{t('Sign in to your account')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('Username')}
            keyboardType="username"
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
          <TouchableOpacity onPress={() => Alert.alert(t('Forgot Password'))} style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>{t('Forgot password?')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{t('Log in')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert(t('Create an Account'))} style={styles.createAccountButton}>
            <Text style={styles.createAccountButtonText}>{t('Create an account')}</Text>
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#777',
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
  createAccountButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;

import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = async (lang) => {
    await i18n.changeLanguage(lang);
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('settings')}</Text>
          <View style={styles.buttonContainer}>
            <Button title="English" onPress={() => handleChangeLanguage('en')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Français" onPress={() => handleChangeLanguage('fr')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="العربية" onPress={() => handleChangeLanguage('ar')} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White overlay with opacity
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10, // Adds space between buttons
  },
});

export default SettingsScreen;

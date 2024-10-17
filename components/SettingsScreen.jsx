import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../src/contexts/ThemeContext'; // Import ThemeContext

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useContext(ThemeContext); // Get theme and toggle function from context

  const handleChangeLanguage = async (lang) => {
    await i18n.changeLanguage(lang);
  };

  return (
    <ImageBackground
      source={require('../assets/back.png')}
      style={styles.backgroundImage}
    >
      <View style={[styles.overlay, { backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)' }]}>
        <View style={styles.container}>
          <Text style={[styles.title, { color: theme === 'light' ? '#000' : '#fff' }]}>{t('settings')}</Text>

          <CustomButton title="English" onPress={() => handleChangeLanguage('en')} theme={theme} />
          <CustomButton title="Français" onPress={() => handleChangeLanguage('fr')} theme={theme} />
          <CustomButton title="العربية" onPress={() => handleChangeLanguage('ar')} theme={theme} />

          <View style={styles.themeToggleContainer}>
            <Text style={[styles.themeToggleText, { color: theme === 'light' ? '#000' : '#fff' }]}>{t('Dark Mode')}</Text>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const CustomButton = ({ title, onPress, theme }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: theme === 'light' ? '#ddd' : '#333' }]}
    >
      <Text style={[styles.buttonText, { color: theme === 'light' ? '#000' : '#fff' }]}>{title}</Text>
    </TouchableOpacity>
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
  button: {
    padding: 8,
    borderRadius:2,
    marginVertical: 7,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
  themeToggleContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeToggleText: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default SettingsScreen;

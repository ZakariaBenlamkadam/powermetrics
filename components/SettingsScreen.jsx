import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = async (lang) => {
    await i18n.changeLanguage(lang);
    // Optionally, you can force a re-render by using a state update or any other mechanism
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings')}</Text>
      <Button title="English" onPress={() => handleChangeLanguage('en')} />
      <Button title="Français" onPress={() => handleChangeLanguage('fr')} />
      <Button title="العربية" onPress={() => handleChangeLanguage('ar')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SettingsScreen;

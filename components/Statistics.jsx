import React, { useState, useContext } from 'react';
import { Modal, SafeAreaView, View, StyleSheet, Text, Button, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../src/contexts/ThemeContext'; // Import ThemeContext

const { width, height } = Dimensions.get('window');

const getStatisticsWebViewUri = () => {
  return "https://app.powerbi.com/reportEmbed?reportId=3c2b20cc-739e-42bb-99d8-4522a4118764&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false";
};

const Statistics = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { theme } = useContext(ThemeContext); // Get the current theme from the context

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const webViewUri = getStatisticsWebViewUri();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/back.png')}
        style={styles.backgroundImage}
      >
        <View style={[styles.overlay, { backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)' }]}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={[styles.sectionTitle, { color: theme === 'light' ? '#333333' : '#ffffff' }]}>{t('Global visualization')}</Text>
              <Button title={t('View Report')} onPress={openModal} />
            </View>
            <Text style={[styles.infoText, { color: theme === 'light' ? '#666666' : '#cccccc' }]}>{t('It is better to rotate your phone for better visualization.')}</Text>
            <Text style={[styles.infoText, { color: theme === 'light' ? '#666666' : '#cccccc' }]}>{t('Please wait until the visualization appears, as it may take some time.')}</Text>
          </View>

          <Modal visible={isModalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={[styles.fullScreenModalContent, { backgroundColor: theme === 'light' ? '#ffffff' : '#333333' }]}>
                {webViewUri ? (
                  <View style={styles.fullScreenWebViewContainer}>
                    <WebView
                      source={{ uri: webViewUri }}
                      style={styles.webView}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                      userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36"
                    />
                  </View>
                ) : (
                  <Text style={{ color: theme === 'light' ? '#000' : '#fff' }}>{t('No data available for the report.')}</Text>
                )}
                <TouchableOpacity style={[styles.closeButton, { backgroundColor: theme === 'light' ? '#fff' : '#555' }]} onPress={closeModal}>
                  <Text style={[styles.closeButtonText, { color: theme === 'light' ? '#000' : '#fff' }]}>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  fullScreenModalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenWebViewContainer: {
    width: '100%',
    height: '100%',
  },
  webView: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 18,
  },
});

export default Statistics;

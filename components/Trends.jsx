import React, { useState, useRef, useContext } from 'react';
import {
  Modal, SafeAreaView, View, StyleSheet, Text, Button, TouchableOpacity,
  Dimensions, ImageBackground
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../src/contexts/ThemeContext'; // Import ThemeContext

const { width, height } = Dimensions.get('window');

const getTrendsWebViewUri = () => {
  return "https://app.powerbi.com/reportEmbed?reportId=48f3eeab-f182-4254-b69a-2365bcca3e6b&autoAuth=true&ctid=60320baf-1da5-4bdc-a22a-353634228897&filterPaneEnabled=false";
};

const Trends = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const webViewRef = useRef(null);
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext); 

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const isLandscape = width > height;
  const webViewUri = getTrendsWebViewUri();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/back.png')}
        style={styles.backgroundImage}
      >
        <View style={[styles.overlay, { backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)' }]}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={[styles.sectionTitle, { color: theme === 'light' ? '#333333' : '#ffffff' }]}>{t('Trends')}</Text>
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
                      ref={webViewRef}
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
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
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
    alignItems: 'center',
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
    marginTop: 10,
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

export default Trends;

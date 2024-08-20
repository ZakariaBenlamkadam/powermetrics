import React, { useState } from 'react';
import { Modal, SafeAreaView, View, StyleSheet, Text, Button, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

const getStatisticsWebViewUri = () => {
  return "https://app.powerbi.com/reportEmbed?reportId=3c2b20cc-739e-42bb-99d8-4522a4118764&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false";
};

const Statistics = () => {
  const { t } = useTranslation();  // Initialize the useTranslation hook
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const isLandscape = width > height;
  const webViewUri = getStatisticsWebViewUri();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>{t('Global visualization')}</Text>
        <Button title={t('View Report')} onPress={openModal} />
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.fullScreenModalContent}>
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
              <Text>{t('No data available for the report.')}</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 40,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fullScreenModalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 18,
  },
});

export default Statistics;

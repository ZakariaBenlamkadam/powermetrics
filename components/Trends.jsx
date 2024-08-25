import React, { useState, useRef } from 'react';
import { Modal, SafeAreaView, View, StyleSheet, Text, Button, TouchableOpacity, Dimensions, Alert, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

const getTrendsWebViewUri = () => {
  return "https://app.powerbi.com/reportEmbed?reportId=473eafc4-008a-4fe6-b297-868f837a4182&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false";
};

const Trends = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const webViewRef = useRef(null);
  const { t } = useTranslation();

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const isLandscape = width > height;
  const webViewUri = getTrendsWebViewUri();

  const generatePDF = async () => {
    try {
      const htmlContent = `
        <html>
          <body>
            <h1>${t('Sample HTML for PDF')}</h1>
            <iframe src="${webViewUri}" style="width:100%; height:500px;" frameborder="0"></iframe>
          </body>
        </html>
      `;

      const { uri: pdfUri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('Generated PDF URI:', pdfUri);

      const downloadsFolder = FileSystem.documentDirectory + 'GeneratedPDF.pdf';
      await FileSystem.moveAsync({
        from: pdfUri,
        to: downloadsFolder,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(downloadsFolder);
      } else {
        Alert.alert(t('Sharing not available'), t('Sharing is not available on this device.'));
      }

      Alert.alert(t('PDF Generated'), `${t('File saved to')} ${downloadsFolder}.`);
      console.log('PDF saved to:', downloadsFolder);

    } catch (error) {
      Alert.alert(t('Error'), t('Failed to generate or save the PDF'));
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/back.png')} 
        style={styles.backgroundImage}
      >
        {/* Overlay with white background and 50% opacity */}
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.sectionTitle}>{t('Trends')}</Text>
            <Button title={t('View Report')} onPress={openModal} />
          </View>
          <Text style={styles.infoText}>{t('It is better to rotate your phone for better visualization.')}</Text>
          <Text style={styles.infoText}>{t('Please wait until the visualization appears, as it may take some time.')}</Text>

          <Modal visible={isModalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.fullScreenModalContent}>
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
                    <Button title={t('Generate PDF')} onPress={generatePDF} />
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
        </View>
      </ImageBackground>
    </SafeAreaView>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 240,
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
  infoText: {
    fontSize: 14,
    color: '#666666',
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

export default Trends;

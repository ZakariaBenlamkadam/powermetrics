import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const getWebViewUri = (cityName) => {
  const uris = {
    Rabat: "https://app.powerbi.com/reportEmbed?reportId=45b9d0ca-c98c-4019-8560-092e8333529f&autoAuth=true&ctid=60320baf-1da5-4bdc-a22a-353634228897&filterPaneEnabled=false",
    Casablanca: "https://app.powerbi.com/reportEmbed?reportId=793fdeb4-52fb-41cc-aac8-3cd7e694a13d&autoAuth=true&ctid=60320baf-1da5-4bdc-a22a-353634228897&filterPaneEnabled=false",
    AlJanoub: "https://app.powerbi.com/reportEmbed?reportId=09f7638f-685d-4e86-80e4-0269b9029f69&autoAuth=true&ctid=60320baf-1da5-4bdc-a22a-353634228897&filterPaneEnabled=false",
    Sous_Massa: "https://app.powerbi.com/reportEmbed?reportId=dd28b683-5b6d-488d-9b47-12a8c7164f8a&autoAuth=true&ctid=60320baf-1da5-4bdc-a22a-353634228897&filterPaneEnabled=false",
    BéniMellal_Kénifra: "https://app.powerbi.com/reportEmbed?reportId=19fd2d00-b386-443c-aba7-e068587fa960&autoAuth=true&ctid=60320baf-1da5-4bdc-a22a-353634228897&filterPaneEnabled=false",
    Oriental: "https://app.powerbi.com/reportEmbed?reportId=586495a6-0b58-4c72-9619-f181ff6ee43d&autoAuth=true&ctid=60320baf-1da5-4bdc-a22a-353634228897&filterPaneEnabled=false",
    Deraa_Tafilalt: "https://app.powerbi.com/reportEmbed?reportId=80783229-010b-48fd-a815-80693498c9a9&autoAuth=true&ctid=60320baf-1da5-4bdc-a22a-353634228897&filterPaneEnabled=false",
    Tangier_Tetouan_Alhoseima: "https://app.powerbi.com/reportEmbed?reportId=d4b561c6-26b2-44c2-a205-e27bd8f3b103&autoAuth=true&ctid=60320baf-1da5-4bdc-a22a-353634228897&filterPaneEnabled=false",
    Fes_Meknes: "https://app.powerbi.com/reportEmbed?reportId=739bcf0e-fd1b-4189-9c40-c1d5dff12362&autoAuth=true&ctid=60320baf-1da5-4bdc-a22a-353634228897&filterPaneEnabled=false",
    Marrakech: "https://app.powerbi.com/reportEmbed?reportId=a444914a-d5ab-47b9-9ec2-4b212a6f2084&autoAuth=true&ctid=60320baf-1da5-4bdc-a22a-353634228897&filterPaneEnabled=false"
  };
  return uris[cityName] || '';
};

const CityModal = ({ visible, city, onClose }) => {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const updateOrientation = ({ window }) => {
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
    };

    const dimensionListener = Dimensions.addEventListener('change', updateOrientation);

    return () => {
      dimensionListener.remove();
    };
  }, []);

  if (!city) {
    return null;
  }

  const webViewUri = getWebViewUri(city.name);
  const isLandscape = orientation === 'landscape';

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
        {webViewUri ? (
          <View style={styles.webViewContainer}>
            <WebView
              source={{ uri: webViewUri }}
              style={styles.webView}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36"
            />
          </View>
        ) : (
          <Text>No data available for this city.</Text>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  webViewContainer: {
    flex: 1,
    marginTop: 0, 
  },
  webView: {
    flex: 1,
  },
});

export default CityModal;

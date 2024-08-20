import React, { useState, useEffect } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const getWebViewUri = (cityName) => {
  const uris = {
    Rabat: "https://app.powerbi.com/reportEmbed?reportId=342e2df2-7bde-4236-b7ba-f99a344f0c55&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false",
    Casablanca: "https://app.powerbi.com/reportEmbed?reportId=4e677a49-31b4-4b50-b6d3-62ea822a8785&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false",
    AlJanoub: "https://app.powerbi.com/reportEmbed?reportId=8bdb5de8-ab09-49d8-a0c5-e3b47779ef36&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false",
    Sous_Massa: "https://app.powerbi.com/reportEmbed?reportId=edbc874c-adc0-48d0-a50e-f469d2e2c3c3&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false",
    BéniMellal_Kénifra: "https://app.powerbi.com/reportEmbed?reportId=76349dbc-32de-49b5-94d6-72182e3bb87c&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false",
    Oriental: "https://app.powerbi.com/reportEmbed?reportId=dc0fa74b-8cfe-4155-a06b-92f44233a4c6&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false",
    Deraa_Tafilalt: "https://app.powerbi.com/reportEmbed?reportId=259229a2-4f08-47be-addf-0635c4831887&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false",
    Tangier_Tetouan_Alhoseima: "https://app.powerbi.com/reportEmbed?reportId=312e89dc-1305-4d4d-9664-51bf7c841c49&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false",
    Fes_Meknes: "https://app.powerbi.com/reportEmbed?reportId=8d14c454-38e3-4b23-8b0b-60dff5fe9855&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false",
    Marrakech: "https://app.powerbi.com/reportEmbed?reportId=d7c3b2f9-a38c-40a2-a18e-d44e65b80a50&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false"
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

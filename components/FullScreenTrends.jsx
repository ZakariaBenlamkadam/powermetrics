// FullScreenReport.js
import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';

const FullScreenTrends = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <WebView
        source={{ uri: "https://app.powerbi.com/reportEmbed?reportId=387d1165-4e2c-4c86-8673-da48b8eb7ad3&autoAuth=true&ctid=c2787922-11d9-4ca8-aadf-5ef7ff31a127&filterPaneEnabled=false" }}
        style={styles.webView}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  webView: {
    flex: 1,
  },
});

export default FullScreenTrends;

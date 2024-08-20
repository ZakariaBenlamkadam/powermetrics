import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        
        <Image source={require('../assets/al-omrane.png')} style={styles.logo} />
        <Text style={styles.headerText}>Welcome to Al Omrane</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.sectionContent}>
          Al Omrane is dedicated to the development and construction of sustainable housing projects. Our mission is to provide quality housing solutions for all.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Projects</Text>
        <Text style={styles.sectionContent}>
          We have a wide range of ongoing and completed projects that aim to improve the living standards of communities across the region.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionContent}>
          Get in touch with us for more information about our projects and services.
        </Text>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20, // Adjusted padding for better layout
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 195,
    height: 150,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  sectionContent: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  contactButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;

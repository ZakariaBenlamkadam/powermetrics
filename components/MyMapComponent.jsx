import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CityModal from './CityModal';
import { useTranslation } from 'react-i18next';


// Sample city data
const cities = [
  { id: 1, name: 'Casablanca', latitude: 33.57009691844365, longitude: -7.628072032411338, subcities: [
    { id: 17, name: 'Casa Est', latitude: 33.59996101112362,  longitude: -7.481625156084768 },
    { id: 18, name: 'Casa Sud', latitude: 33.574220686822486,  longitude: -7.553722931770178 },
    { id: 19, name: 'Mohammedia', latitude: 33.70531879242049,  longitude: -7.398772089804537 },
    { id: 20, name: 'Aljadida', latitude: 33.233805786294944, longitude: -8.493890786748999 },
    ] },
  { id: 2, name: 'Rabat', latitude: 33.9560431512753, longitude: -6.873724761231352, subcities: [
    { id: 11, name: 'Temara', latitude: 33.93088048237724, longitude: -6.9142949595089265 },
    { id: 12, name: 'Kenitra', latitude: 34.26353666817779, longitude: -6.599158740898695 },
    { id: 13, name: 'Tamesna', latitude: 33.83455046637238, longitude: -6.917167938790647 },
    { id: 14, name: 'Khmisset', latitude: 33.82805882255191, longitude: -6.060043312145397 },
    { id: 15, name: 'Sidi Slimane / Sidi Kacem', latitude: 34.22754735085969, longitude: -5.7191421458775915 },
    { id: 16, name: 'Salé', latitude: 34.03380330434124, longitude: -6.800121567813699 },
  ] },
  { id: 3, name: 'Marrakech', latitude: 31.61013191178524, longitude: -7.999034095200848, subcities: [
    { id: 21, name: 'Tamnsourt', latitude: 31.75953776894427, longitude: -8.108157307831307 },
    { id: 22, name: 'Alhaouz', latitude: 31.57500994407029, longitude: -7.987050210816885 },
    { id: 23, name: 'Safi AlYoussoufia', latitude: 32.29536554084749, longitude: -9.234228717119235 },
    { id: 24, name: 'Chichaoua Essaouira', latitude: 31.550675902949695, longitude: -9.764092665799957 },
    { id: 25, name: 'Elkalaa Rhamna', latitude: 32.05408447872628, longitude: -7.39552159863193 },
    ] },
  { id: 4, name: 'Fes_Meknes', latitude: 34.031264582603804, longitude: -4.997611345885621, subcities: [
    { id: 26, name: 'AlHajeb Ifrane', latitude: 33.66819779255869, longitude: -5.373711617385664 },
    { id: 27, name: 'Elmenzeh', latitude: 33.901712236139346, longitude: -5.533081171909556 },
    { id: 28, name: 'Errachidia', latitude: 31.927915269809173, longitude: -4.428328057658784 },
    { id: 29, name: 'Sefrou', latitude: 33.830422367835396, longitude: -4.835057505005602 },
    { id: 30, name: 'Moulay yaakoub', latitude: 34.08762161343223, longitude: -5.178401464302815 },
    ] },
  { id: 5, name: 'Tangier_Tetouan_Alhoseima', latitude: 35.58860236914662, longitude: -5.338565745820709, subcities: [
    { id: 26, name: 'Charafate', latitude: 35.049163068352165, longitude: -5.105941165189791 },
    { id: 27, name: 'AlHoseima', latitude: 35.25690934609446, longitude: -3.9286597942174937 },
    { id: 28, name: 'Larache', latitude: 35.174918243104024, longitude: -6.154790880359281 },
    { id: 29, name: 'Tanger', latitude: 35.7812910134694, longitude: -5.8240454229041045 },
    { id: 30, name: 'Tetouan', latitude: 35.57514841026283, longitude: -5.35944070514894 },
    ] },
  { id: 6, name: 'Deraa_Tafilalt', latitude: 31.93470386907458, longitude: -4.430547695117257, subcities: [
    { id: 26, name: 'Ouarzazate', latitude: 30.920061221258695, longitude:  -6.919470681883108 },
    { id: 27, name: 'Midelt', latitude: 32.67626036678749, longitude: -4.718971531560774 },
    ] },
  { id: 7, name: 'Oriental', latitude: 34.678621370942466, longitude: -1.9283835900372723, subcities: [
    { id: 31, name: 'Berkane', latitude: 34.92793305789552, longitude: -2.331328461191224 },
    { id: 32, name: 'Taourirte', latitude: 34.41301553768135, longitude: -2.894578032376923 },
    { id: 33, name: 'Driouch Nador', latitude: 35.06922491950224, longitude: -2.9286301458426376 },
    { id: 34, name: 'Jerada Figuig', latitude: 34.67123636255576, longitude: -1.9366139458592486 },
    { id: 35, name: 'Guercif', latitude: 34.22575297115625, longitude: -3.346813994505149 },
    { id: 36, name: 'Oujda', latitude: 34.67868690846069, longitude: -1.9283735188729256 },

    ] },
  { id: 8, name: 'Bénimellal_Khénifra', latitude: 32.32726626516547, longitude: -6.373796945953661, subcities: [
    { id: 47, name: 'Beni mellal', latitude: 32.32728439705602, longitude: -6.373796945953661 },
    { id: 48, name: 'Khouribga', latitude: 32.87979583194323, longitude: -6.915749397880726 },
    ] },
  { id: 9, name: 'Sous_Massa', latitude: 30.440282220983956, longitude: -9.558720307795822, subcities: [
    { id: 43, name: 'Tiznit', latitude: 29.69441223785646, longitude: -9.731127797945334 },
    { id: 44, name: 'Taroudant', latitude: 30.486742611717563, longitude: -8.873769395484429 },
    { id: 45, name: 'Inzegane Ait Melloul', latitude: 30.363320148703977, longitude: -9.525004317192618 },
    { id: 46, name: 'Agadir', latitude: 30.39553497079352, longitude: -9.538916432534048 },
    
    ] },
  { id: 10, name: 'AlJanoub', latitude: 27.12989982466488, longitude: -13.183193298696409, subcities: [
    { id: 37, name: 'Boujdour', latitude: 26.12607593292972, longitude: -14.484549018434661 },
    { id: 38, name: 'Dakhla', latitude: 23.72128882376209, longitude: -15.934247382286388 },
    { id: 39, name: 'Guelmim', latitude: 28.988316977527948, longitude: -10.053499026689504 },
    { id: 40, name: 'Semara', latitude: 26.741352505045207, longitude: -11.678853396443083 },
    { id: 41, name: 'TanTan', latitude: 28.437370260060643, longitude: -11.097522017829387 },
    { id: 42, name: 'Laayoune', latitude: 27.107592549242245, longitude:  -13.142681215216035 },
  ] },
];

// Function to convert decimal color to hexadecimal string
const decimalToHexColor = (decimalColor) => {
  return `#${decimalColor.toString(16).padStart(6, '0')}`;
};
const MyMapComponent = () => {
  const { t } = useTranslation();
  const [showSubcities, setShowSubcities] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [region, setRegion] = useState({
    latitude: 31.5,
    longitude: -7.5,
    latitudeDelta: 12.0,
    longitudeDelta: 15.0,
  });

  const handleMarkerPress = (city) => {
    if (!city.subcities) return; // Do nothing if the city has no subcities

    setShowSubcities(city);
    setRegion({
      latitude: city.latitude,
      longitude: city.longitude,
      latitudeDelta: 1.0,
      longitudeDelta: 1.0,
    });
    setSelectedCity(null);
  };

  const handleReturnToMain = () => {
    setShowSubcities(null);
    setRegion({
      latitude: 31.5,
      longitude: -7.5,
      latitudeDelta: 12.0,
      longitudeDelta: 15.0,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
      >
        {!showSubcities && cities.map((city) => (
          <Marker
            key={city.id}
            coordinate={{ latitude: city.latitude, longitude: city.longitude }}
            title={city.name}
            onPress={() => handleMarkerPress(city)}
            pinColor="black"
          />
        ))}
        {showSubcities && (
          <>
            <Marker
              key={showSubcities.id}
              coordinate={{ latitude: showSubcities.latitude, longitude: showSubcities.longitude }}
              title={showSubcities.name}
              pinColor="red"
            />
            {showSubcities.subcities.map((subcity) => (
              <Marker
                key={subcity.id}
                coordinate={{ latitude: subcity.latitude, longitude: subcity.longitude }}
                title={subcity.name}
                pinColor={decimalToHexColor(995862)} // Example with decimal color 255 (0x0000FF)
                onPress={() => {}} // Do nothing on subcity press
              />
            ))}
          </>
        )}
      </MapView>
      {showSubcities && (
        <View style={styles.buttonContainer}>
          <Button title={t('showDetails', { city: showSubcities.name })} onPress={() => setSelectedCity(showSubcities)} />
          <Button title={t('mainMap')} onPress={handleReturnToMain} />
        </View>
      )}
      <CityModal
        visible={!!selectedCity}
        onClose={() => setSelectedCity(null)}
        city={selectedCity}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#00000',
  },
});

export default MyMapComponent;

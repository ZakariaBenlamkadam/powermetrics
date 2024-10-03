import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';

// Data
const freeGames = [
  { poster: require('../assets/al-omrane2.png'), title: 'Altos Odyssey', subtitle: 'Noodlecake Studios', isFree: 'Yes', id: '1' },
  { poster: require('../assets/al-omrane2.png'), title: 'Asphalt 9', subtitle: 'Gameloft', isFree: 'Yes', id: '2' },
];

// CustomSwitch Component
const CustomSwitch = ({ selectionMode, option1, option2, onSelectSwitch }) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View style={{ height: 44, width: '100%', backgroundColor: '#e4e4e4', borderRadius: 10, borderColor: '#0f3216', flexDirection: 'row', justifyContent: 'center' }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode === 1 ? '#0f3216' : '#e4e4e4',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: getSelectionMode === 1 ? 'white' : '#0f3216', fontSize: 14, fontFamily: 'Roboto-Medium' }}>
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode === 2 ? '#0f3216' : '#e4e4e4',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: getSelectionMode === 2 ? 'white' : '#0f3216', fontSize: 14, fontFamily: 'Roboto-Medium' }}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ListItem Component
const ListItem = ({ photo, title, subTitle, isFree, onPress }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
      <Image source={photo} style={{ width: 55, height: 55, borderRadius: 10, marginRight: 8 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#333', fontFamily: 'Roboto-Medium', fontSize: 14 }}>{subTitle}</Text>
        <Text numberOfLines={1} style={{ color: '#0f3216', fontFamily: 'Roboto-Medium', fontSize: 14, textTransform: 'uppercase' }}>
          {title}
        </Text>
      </View>
    </View>
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#0f3216', padding: 10, width: 100, borderRadius: 10 }}>
      <Text style={{ color: '#fff', textAlign: 'center', fontFamily: 'Roboto-Medium', fontSize: 14 }}>
        {isFree === 'Yes' ? 'Play' : 'Buy'}
      </Text>
    </TouchableOpacity>
  </View>
);

// HomeScreen Component
export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const [gamesTab, setGamesTab] = useState(1);

  const onSelectSwitch = value => {
    setGamesTab(value);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}>
            {t('Hello Zakaria')}
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require('../assets/profile.png')}
              style={{ width: 35, height: 35 }}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', borderColor: '#C6C6C6', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 }}>
          <Feather name="search" size={20} color="#C6C6C6" style={{ marginRight: 5 }} />
          <TextInput placeholder={t('Search')} style={{ flex: 1 }} />
        </View>

        <View style={{ marginVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' }}>
            {t('Our branches')}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: '#0f3216' }}>{t('See all')}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 20 }}>
          <CustomSwitch
            selectionMode={1}
            option1={t('Free to play')}
            option2={t('Paid games')}
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        {gamesTab === 1 && freeGames.map(item => (
          <ListItem
            key={item.id}
            photo={item.poster}
            title={item.title}
            subTitle={item.subtitle}
            isFree={item.isFree}
            onPress={() => navigation.navigate('GameDetails', { title: item.title, id: item.id })}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

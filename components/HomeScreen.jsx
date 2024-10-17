import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../src/contexts/ThemeContext'; // Import ThemeContext

// Data
const freeGames = [
  { poster: require('../assets/rabat.jpg'), titleKey: 'Group Alomrane', subtitleKey: 'Rabat Sale Kenitra', isFree: 'Yes', id: '1' },
  { poster: require('../assets/casablanca.jpg'), titleKey: 'Group ALomrane', subtitleKey: 'Casablanca Settat', isFree: 'Yes', id: '2' },
  { poster: require('../assets/chamal.jpg'), titleKey: 'Group ALomrane', subtitleKey: 'Tanger Tetouan AlHoseima', isFree: 'Yes', id: '3' },
  { poster: require('../assets/oujda.jpg'), titleKey: 'Group ALomrane', subtitleKey: 'L Oriental', isFree: 'Yes', id: '4' },
  { poster: require('../assets/fes.jpeg'), titleKey: 'Group ALomrane', subtitleKey: 'Fes Meknes', isFree: 'Yes', id: '5' },
  { poster: require('../assets/aljanoub.jpg'), titleKey: 'Group ALomrane', subtitleKey: 'AlJanoub', isFree: 'Yes', id: '6' },
  { poster: require('../assets/deraa tafilalt.jpg'), titleKey: 'Group ALomrane', subtitleKey: 'Deraa Tafilalt', isFree: 'Yes', id: '7' },
  { poster: require('../assets/agadir.jpg'), titleKey: 'Group ALomrane', subtitleKey: 'Sous Massa', isFree: 'Yes', id: '8' },
  { poster: require('../assets/kech.png'), titleKey: 'Group ALomrane', subtitleKey: 'Marrakech Safi', isFree: 'Yes', id: '9' },
  { poster: require('../assets/tadla.jpg'), titleKey: 'Group ALomrane', subtitleKey: 'BenniMellal Khenifra', isFree: 'Yes', id: '10' },
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

const ListItem = ({ photo, titleKey, subTitleKey, isFree, onPress, theme }) => {
  const { t } = useTranslation(); // Use translation hook

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <Image source={photo} style={{ width: 45, height: 45, borderRadius: 10, marginRight: 15  }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme === 'light' ? '#000' : '#fff', fontFamily: 'Roboto-Medium', fontSize: 14}}>
            {t(subTitleKey)}
          </Text>
          <Text numberOfLines={1} style={{ color: theme === 'light' ? '#0f3216' : '#fff', fontFamily: 'Roboto-Medium', fontSize: 14, textTransform: 'uppercase' }}>
            {t(titleKey)}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress} style={{ backgroundColor: theme === 'light' ? '#0f3216' : '#fff', padding: 10, width: 100, borderRadius: 10, marginLeft: 80 }}>
        <Text style={{ color: theme === 'light' ? '#fff' : '#0f3216', textAlign: 'center', fontFamily: 'Roboto-Medium', fontSize: 14 }}>
          {isFree === 'Yes' ? t('Explore') : 'Buy'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
// HomeScreen Component
export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const [gamesTab, setGamesTab] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const { theme } = useContext(ThemeContext); // Get current theme from context

  const onSelectSwitch = value => {
    setGamesTab(value);
  };

  const filteredGames = freeGames.filter(item =>
    t(item.subtitleKey).toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/back.png')}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <View style={{ flex: 1, backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)', padding: 20 , paddingBottom: 0}}>
          <ScrollView contentContainerStyle={{ padding: 0 }}>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: theme === 'light' ? '#000' : '#fff' }}>
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
                <TextInput
                  placeholder={t('Search')}
                  placeholderTextColor={theme === 'light' ? '#aaa' : '#fff'} // Adjust placeholder color based on theme
                  style={{ flex: 1, color: theme === 'light' ? '#000' : '#fff' }} // Adjust text color based on theme
                  value={searchQuery}
                  onChangeText={text => setSearchQuery(text)}
                />

              </View>
              <View style={{ marginVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium' ,color: theme === 'light' ? '#000' : '#fff'}}>
                  {t('Our branches')}
                </Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={{ color: theme === 'light' ? '#000' : '#fff' }}>{t('See all')}</Text>
                </TouchableOpacity>
              </View>

              
              <View style={{ marginVertical: 20 }}>
                <CustomSwitch
                  selectionMode={1}
                  option1={t('Branches')}
                  option2={t('Agencies')}
                  onSelectSwitch={onSelectSwitch}
                />
              </View>

              {/* Render ListItems */}
              {filteredGames.map((item) => (
              <ListItem
                key={item.id}
                photo={item.poster}
                titleKey={item.titleKey} // Change from title to titleKey
                subTitleKey={item.subtitleKey} // Change from subTitle to subtitleKey
                isFree={item.isFree}
                onPress={() => console.log(item.id)}
                theme={theme} 
              />
            ))}


            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

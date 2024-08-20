import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, SafeAreaView, Image, TextInput } from 'react-native';

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ paddingLeft: 30 }}>
                <Image
                    source={require('../assets/login.png')}
                    style={{ width: 350, height: 350 }}
                />
            </View>
            <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, width: '90%', marginVertical: 10 }}>
                <TextInput placeholder='Email Id ' style={{}} keyboardType='email-address' />
            </View>
            <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1, width: '90%', marginVertical: 10 }}>
                <TextInput placeholder='Password' secureTextEntry={true} />
            </View>
            
        </SafeAreaView>
    );
}

export default Home;

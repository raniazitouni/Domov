import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme/constants.js';
import Card from '../components/Card.js';
import Settings from '../assets/svgs/settings.js';
import { loadFonts } from '../theme/constants.js';
import Flat from '../components/Flat.js';

export default function HomeScreen() {
  const navigation = useNavigation();
  const fontsLoaded = loadFonts();

  if (!fontsLoaded) {
   return undefined;
  }

  const WIDTH = Dimensions.get('window').width

  const navigateToAddDeviceScreen = () => {
    navigation.navigate('AddDeviceScreen');
  };
  
  return (
    <ScreenWrapper style={[tw `flex-1`, {width:WIDTH}]}>
      <View style={tw `mx-5 flex flex-col `}>
       <View style={[tw `flex-row justify-between items-center mt-5`]}>
        <Text style={{fontFamily:'Inter-SemiBold', fontSize:50}}>Home</Text>
        <TouchableOpacity 
          style={tw `${colors.mainbg} flex justify-center items-center relative bg-black w-40px h-40px border-none bg-gray-200 rounded-full`}
          onPress={navigateToAddDeviceScreen}
        >
         <Settings/>    
        </TouchableOpacity>
       </View>
       <Card/>
        <Flat /> 
      </View>
    </ScreenWrapper> 
  );
}

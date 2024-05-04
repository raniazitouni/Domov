import { View, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Visit from '../assets/svgs/visit';
import Manual from '../assets/svgs/manual';
import Device from '../components/Device';
import tw from 'twrnc';
import { colors } from '../theme/constants';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import Logo from '../assets/svgs/logo';




export default function HelpScreen() {

  const handleVisit = async () => {
    const url = 'https://www.facebook.com'; //TO CHANGGEEEEEEEEEEE
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  }

  
  return (
    <ScreenWrapper>
      <View style={tw `mx-5 flex flex-col   `}>
      <View style={tw `flex items-center m-15`}>
      <Logo/>
      </View>
      <Text style={[tw`ml-3 text-18px mb-5 mt-7 pb-1`, { fontFamily: 'Inter-Regular', color: colors.maingrey }]}> For further information :  </Text>
      <View style={[tw`h-full m-3 flex `]}>
        <TouchableOpacity onPress={handleVisit}>
          <Device name={"Visit our web site"} icon={<Visit />} />
        </TouchableOpacity>
      </View>
      </View>
    </ScreenWrapper>
  )
}

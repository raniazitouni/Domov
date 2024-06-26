import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import tw from 'twrnc';
import { colors } from '../theme/constants';
import DeviceCard from './DeviceCard';
import { TouchableOpacity } from 'react-native';
import ConnectModal from './Modal';
import Modal2 from './Modal2';


export default function Flat() {
  const [data, setData] = useState([
    { name: 'Device 1', key: 1, connected: false },
    // { name: 'Device 2', key: 2, connected: false },
    // { name: 'Device 3', key: 3, connected: false },
    // { name: 'Device 4', key: 4, connected: false },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConnected,setModalConnnected] = useState(false);

  const [modalVisible2, setModalVisible2] = useState(false);

  const connectedDevices = data.filter(device => device.connected === true);
  const availableDevices = data.filter(device => device.connected === false);

  const [switchValue , setSwitchValue] = useState(false);

  const toggleDevice = (deviceId) => {
    // Delayed toggle
    setTimeout(() => {
      setData(prevData => prevData.map(device => {
        if (device.key === deviceId) {
          setModalConnnected(true);
          return { ...device, connected: !device.connected };
        }
        return device;
      }));
    }, 2000); // Adjust the delay time as needed
  };

  const handleItemPress = (deviceId, connected) => {
    if (!connected) {
      setModalVisible(true);
      toggleDevice(deviceId);
      
    }
  };

  const receiveVariableFromDeviceCard = (variable) => {
    setSwitchValue(variable);
  }

  const handleItemLongPress = (deviceId, connected) => {
    if (connected && switchValue ) {
      setModalVisible2(true);
    }
  };

  
  // Function to handle closing of the second modal
  const handleCloseModal2 = () => {
    setModalVisible2(false);
  };


  return (
    <View>

      {connectedDevices.length > 0 && (
        <View>
          <Text style={[tw`ml-3 text-18px mb-5 mt-7 pb-1`, { fontFamily: 'Inter-Regular', color: colors.maingrey }]}> Connected </Text>
          <FlatList
            data={connectedDevices}
            renderItem={({ item }) => (
              <TouchableOpacity onLongPress={() => handleItemLongPress(item.key, item.connected)}>
              <DeviceCard
              name={item.name}
              connect={item.connected}
              sendVariableToFlat={receiveVariableFromDeviceCard}
              />
              </TouchableOpacity>
            )}
            numColumns={1}
            
          />
        </View>
      )}
      {availableDevices.length > 0 && (
        <View>
          <Text style={[tw`ml-3 text-18px mb-5 mt-7  pb-1`, { fontFamily: 'Inter-Regular', color: colors.maingrey }]}> Devices available </Text>
          <FlatList
            data={availableDevices}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemPress(item.key, item.connected)}>
              <DeviceCard
               name={item.name}
               connect={item.connected}
              
              />
                
              </TouchableOpacity>
            )}
            numColumns={1}
            
          />
        </View>
      )}

      {data.length === 0 && (
        <View style={tw `flex items-center`}>
          <Text style={[tw` text-18px mt-10 `, { fontFamily: 'Inter-Regular', color: colors.maingrey }]}> no device available ...</Text>
        </View>
      )}
       
      <Modal2 isVisible={modalVisible2} onClose={handleCloseModal2} />

      <ConnectModal isVisible={modalVisible} isConnected={modalConnected}/>

    </View>
  );
}

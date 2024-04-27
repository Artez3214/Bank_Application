import { Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { BlurView } from 'expo-blur';
import CustomHeader from '@/components/CustomHeader';

const Layout  = () => {
    return (
      <Tabs 
      sceneContainerStyle={{ backgroundColor: '#030304' }}
      screenOptions={{
        tabBarActiveTintColor: Colors.background,
        tabBarBackground: () => (
          <BlurView
            intensity={100}
            style={{
              flex: 1,
              backgroundColor: '#030304',
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: '#030304',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}>
<Tabs.Screen
  name="home"
  options={{
    title: 'Home',
    headerTitleAlign: 'center',
    headerTitleStyle: { color: '#fdfffc' },
    tabBarIcon: ({ size, color }) => (
      <FontAwesome name="registered" size={size} color="#ff9f1c" />
    ),
    headerTransparent: true,
  }}
/>
 <Tabs.Screen
        name="invest"
        options={{
          title: 'Invest',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="line-chart" size={size} color="#ff9f1c" />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: 'Transfers',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="exchange" size={size} color="#ff9f1c"  />
          ),
        }}
      />
        </Tabs>
      );
    };
    <Tabs.Screen
    name="fa-btc"
    options={{
      title: 'Crypto',
      tabBarIcon: ({ size, color }) => 
      <FontAwesome name="th" size={size} color="#ff9f1c" />,
      header: () => <CustomHeader />,
      headerTransparent: true,
    }}
  />
export default Layout;

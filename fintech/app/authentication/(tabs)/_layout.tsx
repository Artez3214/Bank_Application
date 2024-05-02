import { Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { BlurView } from 'expo-blur';
import { useAuth } from '@clerk/clerk-expo';

const Layout = () => {

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
          tabBarLabelStyle: { color: '#ff9f1c' },
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: 'Transfers',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="exchange" size={size} color="#ff9f1c" />
          ),
          tabBarLabelStyle: { color: '#ff9f1c' },
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          headerTitleStyle: { color: '#fdfffc' },
          title: 'Crypto',
          headerTitleAlign: 'center',
          tabBarIcon: ({ size, color }) => <FontAwesome name="bitcoin" size={size} color="#ff9f1c" />,
          tabBarLabelStyle: { color: '#ff9f1c' },
          headerTransparent: true,
        }}
      />
            <Tabs.Screen
        name="user"
        options={{
          headerTitleStyle: { color: '#fdfffc' },
          title: 'user',
          headerTitleAlign: 'center',
          tabBarIcon: ({ size, color }) => <FontAwesome name="user" size={size} color="#ff9f1c" />,
          tabBarLabelStyle: { color: '#ff9f1c' },
          headerTransparent: true,
        }}
      />
    </Tabs>
    
  );
};

export default Layout;

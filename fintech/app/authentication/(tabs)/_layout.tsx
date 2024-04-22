import { Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const Layout  = () => {
    return (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarStyle: {
              backgroundColor: 'transparent',
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
              tabBarIcon: ({ size, color }) => (
                <FontAwesome name="registered" size={size} color={color} />
              ),
              headerTransparent: true,
            }}
          />

        </Tabs>
      );
    };

export default Layout;

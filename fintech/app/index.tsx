import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAssets } from 'expo-asset';
import { Video, ResizeMode } from 'expo-av'; // Import ResizeMode
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
  const [assets] = useAssets([require('@/assets/videos/intro/chips.mp4')]);

  return (
    <View style={styles.container} testID='video'>
      {assets && (
        <Video
          isMuted
          isLooping
          shouldPlay
          source={{ uri: assets[0].uri }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
        />
      )}
<Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'  }}> Unlock Fintech. Login or join us!
</Text>
      <View style={styles.buttonContainer}>
        <Link
          href={'/login'}
          style={[
            defaultStyles.pillButton,
            {
              backgroundColor: '#2ec4b6',
              padding: 10,
              height: 60,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '500' }}>Log in</Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={'/signup'} 
          style={[defaultStyles.pillButton]}
          asChild
        >
          <TouchableOpacity testID="SignUpButton">
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '500' }}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align video to the top
    alignItems: 'center',
    backgroundColor: '#030304', // Set background color to black
  },
  video: {
    width: '100%',
    height: '60%', // Set video height to 60% of the container height
  },
  buttonContainer: {
    alignItems: 'center', // Center buttons vertically
    marginBottom: 60,
  },
});

export default Page;

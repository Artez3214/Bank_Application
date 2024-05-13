import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


const Page = () => {
  const {signOut} = useAuth();

  const onLogoutPress = () => {
    signOut();
  };

  return (

    <View style={styles.container}>
  
      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={onLogoutPress}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030304',
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButton: {
    position: 'absolute',
    top: -30,
    right: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fdfffc',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#fdfffc',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#e71d36',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#ff9f1c',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: '#fdfffc',
    backgroundColor: '#2ec4b6',
  },
});
export default Page;
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';
import { MoodPicker } from '../components/MoodPicker';

const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

export const Home = () => {
  const { handleSelectMood } = useAppContext();

  return (
    <ImageBackground style={styles.container} source={{ uri: imageUrl }}>
      <MoodPicker handleSelectMood={handleSelectMood} />
    </ImageBackground>

    // <View style={styles.container}>
    //   <Image source={{ uri: imageUrl }} style={{ flex: 1 }} />
    //   <View style={[StyleSheet.absoluteFill, { justifyContent: 'center' }]}>
    //     <MoodPicker handleSelectMood={handleSelectMood} />
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

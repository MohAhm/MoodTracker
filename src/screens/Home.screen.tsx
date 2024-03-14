import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppContext } from '../App.provider';
import { MoodPicker } from '../components/MoodPicker';

export const Home = () => {
  const { handleSelectMood } = useAppContext();

  return (
    <View style={styles.container}>
      <MoodPicker handleSelectMood={handleSelectMood} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

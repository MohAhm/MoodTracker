import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MoodItemRow } from '../components/MoodItemRow';
import { MoodPicker } from '../components/MoodPicker';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';

export const Home = () => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((selectedMood: MoodOptionType) => {
    setMoodList(current => [
      ...current,
      {
        mood: selectedMood,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <MoodPicker handleSelectMood={handleSelectMood} />
      {moodList.map(item => (
        <MoodItemRow key={item.timestamp} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

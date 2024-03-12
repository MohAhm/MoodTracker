import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
        <Text key={item.timestamp}>
          {item.mood.emoji} {new Date(item.timestamp).toDateString()}
        </Text>
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

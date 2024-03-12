import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { MoodOptionType } from '../types';

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

type MoodPickerProps = {
  handleSelectMood: (moodOption: MoodOptionType) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({ handleSelectMood }) => {
  const [selectedMode, setSelectedMode] = useState<MoodOptionType>();

  const handleSelect = useCallback(() => {
    if (selectedMode) {
      handleSelectMood(selectedMode);
      setSelectedMode(undefined);
    }
  }, [selectedMode, handleSelectMood]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map(mood => (
          <View key={mood.emoji}>
            <Pressable
              onPress={() => setSelectedMode(mood)}
              style={[
                styles.moodItem,
                selectedMode?.emoji === mood.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text key={mood.emoji}>{mood.emoji}</Text>
            </Pressable>
            {selectedMode?.emoji === mood.emoji && (
              <Text style={styles.descriptionText}>{mood.description}</Text>
            )}
          </View>
        ))}
      </View>
      <Pressable style={styles.button} onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: theme.colorPurple,
    margin: 10,
    borderRadius: 10,
    padding: 20,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  selectedMoodItem: {
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: theme.colorPurple,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

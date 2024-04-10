import React from 'react';
import { ScrollView } from 'react-native';
import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

export const History = () => {
  const { moodList } = useAppContext();

  return (
    <ScrollView>
      {moodList
        .slice()
        .reverse()
        .map(item => (
          <MoodItemRow key={item.timestamp} item={item} />
        ))}
    </ScrollView>
  );
};

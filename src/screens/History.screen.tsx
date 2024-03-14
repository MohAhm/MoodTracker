import React from 'react';
import { View } from 'react-native';
import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

export const History = () => {
  const { moodList } = useAppContext();

  return (
    <View>
      {moodList.map(item => (
        <MoodItemRow key={item.timestamp} item={item} />
      ))}
    </View>
  );
};

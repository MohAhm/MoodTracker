import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from './types';

type AppData = {
  modeList: MoodOptionWithTimestamp[];
};

const dataKey = 'my-app-data';

const setAppData = async (data: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(dataKey, JSON.stringify(data));
  } catch {}
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const result = await AsyncStorage.getItem(dataKey);
    if (result) {
      return JSON.parse(result);
    }
  } catch {}

  return null;
};

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
  handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
  handleDeleteMood: () => {},
});

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((selectedMood: MoodOptionType) => {
    setMoodList(current => {
      const newModeList = [
        ...current,
        {
          mood: selectedMood,
          timestamp: Date.now(),
        },
      ];

      setAppData({ modeList: newModeList });

      return newModeList;
    });
  }, []);

  const handleDeleteMood = useCallback((mood: MoodOptionWithTimestamp) => {
    setMoodList(current => {
      const newMoodList = current.filter(
        val => val.timestamp !== mood.timestamp,
      );

      setAppData({ modeList: newMoodList });
      return newMoodList;
    });
  }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.modeList);
      }
    };

    fetchAppData();
  }, []);

  return (
    <AppContext.Provider
      value={{ moodList, handleSelectMood, handleDeleteMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);

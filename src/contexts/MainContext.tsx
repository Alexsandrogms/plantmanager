import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type MainContextProps = {
  username: String;
};

export const MainContext = createContext({} as MainContextProps);

interface MainProviderProps {
  children: ReactNode;
}

export function MainProvider({ children }: MainProviderProps) {
  const [username, setUsername] = useState<String>('');

  const getUsername = async () => {
    const user = await AsyncStorage.getItem('@plantmanager:username');
    setUsername(String(user));
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <MainContext.Provider
      value={{
        username,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export const useMainContext = () => useContext(MainContext);

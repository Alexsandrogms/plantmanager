import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Load } from '@components';
import { getUsername } from '@utils/asyncStorage';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Routes() {
  const [hasUser, setHasUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUsername();

        await AsyncStorage.removeItem('@plantmanager:username');

        setHasUser(user ? true : false);
      } catch (error) {
        console.log(error);
      }
      
      setLoading(false);
    })();
  }, []);

  if (loading) return <Load />;

  return (
    <NavigationContainer>
      {hasUser ? <AuthRoutes /> : <AppRoutes />}
    </NavigationContainer>
  );
}

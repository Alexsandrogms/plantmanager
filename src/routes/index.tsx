import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MainProvider } from '@contexts/MainContext';

import AppRoutes from './app.routes';

export default function Routes() {
  return (
    <NavigationContainer>
      <MainProvider>
        <AppRoutes />
      </MainProvider>
    </NavigationContainer>
  );
}

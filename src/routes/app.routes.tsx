import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import colors from '@styles/colors';

import {
  Welcome,
  Confirmation,
  Identification,
  Plant,
} from '@pages';

import TabRoutes from './tab.routes';

const { Navigator, Screen } = createStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Screen name="Welcome" component={Welcome} />
      <Screen name="Identification" component={Identification} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="PlantSelection" component={TabRoutes} />
      <Screen name="Plant" component={Plant} />
    </Navigator>
  );
}

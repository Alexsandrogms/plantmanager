import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '@styles/colors';
import { Plant } from '@pages';

import TabRoutes from './tab.routes';

const { Navigator, Screen } = createStackNavigator();

export default function AuthRoutes() {
  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Screen name="PlantSelection" component={TabRoutes} />
      <Screen name="Plant" component={Plant} />
    </Navigator>
  );
}

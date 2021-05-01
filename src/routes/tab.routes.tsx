import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import colors from '@styles/colors';
import fonts from '@styles/fonts';

import { MyPlants, PlantSelection } from '@pages';

const { Navigator, Screen } = createMaterialTopTabNavigator();

export default function TabRoutes() {
  return (
    <Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        showIcon: true,
        inactiveTintColor: colors.gray,
        activeTintColor: colors.green,
        iconStyle: {
          width: 30,
          height: 30,
          fontSize: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        labelStyle: {
          fontFamily: fonts.light,
          textTransform: 'capitalize',
          color: colors.heading,
          marginLeft: 10,
        },
      }}
      initialRouteName="Plant"
    >
      <Screen
        name="PlantSelection"
        component={PlantSelection}
        options={{
          title: 'Nova Planta',
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={30} color={color} />
          ),
        }}
      />
      <Screen
        name="MyPlants"
        component={MyPlants}
        options={{
          title: 'Minhas Plantas',
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-outline" size={30} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}

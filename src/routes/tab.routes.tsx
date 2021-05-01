import React, { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ColorValue, Text } from 'react-native';

import colors from '@styles/colors';
import fonts from '@styles/fonts';

import { MyPlants, PlantSelection } from '@pages';

const { Navigator, Screen } = createMaterialTopTabNavigator();

type TabBarLabelProps = {
  text: string;
  color: ColorValue | undefined;
  children?: ReactNode;
};

const TabBarLabel = ({ text, color }: TabBarLabelProps) => (
  <Text
    style={{
      fontFamily: fonts.light,
      textTransform: 'capitalize',
      color,
    }}
  >
    {text}
  </Text>
);

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
      }}
      initialRouteName="Plant"
    >
      <Screen
        name="PlantSelection"
        component={PlantSelection}
        options={{
          tabBarLabel: ({ color }) => (
            <TabBarLabel text="Nova PLanta" color={color} />
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={30} color={color} />
          ),
        }}
      />
      <Screen
        name="MyPlants"
        component={MyPlants}
        options={{
          tabBarLabel: ({ color }) => (
            <TabBarLabel text="Minhas PLantas" color={color} />
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-outline" size={30} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}

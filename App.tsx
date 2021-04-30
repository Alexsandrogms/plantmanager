import React from 'react';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
  Jost_500Medium,
} from '@expo-google-fonts/jost';

import { Identification } from './src/pages/Identification';

export default function App() {
  let [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
    Jost_500Medium,
  });

  if (!fontsLoaded) return <AppLoading />;

  return <Identification />;
}

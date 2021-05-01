import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import plantImg from '@assets/plant.png';
import fonts from '@styles/fonts';
import colors from '@styles/colors';

export default function Error() {
  return (
    <View style={styles.wrapper}>
      <Image source={plantImg} />
      <Text style={styles.title}>Adicione novas plantas.</Text>
      <Text style={styles.subtitle}>
        OOPS! Não conseguimos encontrar suas plantinhas 😅. 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 30,
    textAlign: 'center',
    color: colors.gray_dark,
    marginTop: 30,
  },
  subtitle: {
    fontFamily: fonts.heading,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 30,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 5,
  },
});

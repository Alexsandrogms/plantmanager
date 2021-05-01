import React from 'react';

import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import fonts from '@styles/fonts';
import colors from '@styles/colors';

import { useMainContext } from '@contexts/MainContext';

interface HeaderProps {
  title: string;
  subtitle: string;
  image: string;
}

const { width: screenW } = Dimensions.get('window');

export default function Header({ title, subtitle, image }: HeaderProps) {
  const { username } = useMainContext();

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle || username}</Text>
      </View>
      <Image
        source={{
          uri: 'https://avatars.githubusercontent.com/u/49795688?v=4',
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getStatusBarHeight(),
    maxWidth: screenW - 32,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontFamily: fonts.light,
    color: colors.heading,
  },
  subtitle: {
    maxWidth: screenW - 32 - 120,
    fontSize: 32,
    lineHeight: 36,
    fontFamily: fonts.heading,
    color: colors.heading,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});

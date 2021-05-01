import React from 'react';

import Svg, { SvgFromUri } from 'react-native-svg';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
}

export default function PlantCardSecondary({ data, ...rest }: PlantProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={37} height={41} />

      <Text style={styles.title}>{data.name}</Text>
      <View style={styles.details}>
        <Text style={styles.label}>Regar as</Text>
        <Text style={styles.timeLabel}>{data.hour}</Text>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 26,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.shape,
    marginVertical: 8,
    shadowColor: colors.blue,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 2,
  },
  title: {
    flex: 1,
    color: colors.heading,
    fontFamily: fonts.medium,
    fontWeight: '500',
    marginVertical: 16,
    fontSize: 13,
    textAlign: 'center',
  },
  details: {
    alignItems: 'flex-end',
  },
  label: {
    fontFamily: fonts.text,
    fontSize: 13,
    lineHeight: 20,
    color: colors.gray_dark,
  },
  timeLabel: {
    fontFamily: fonts.medium,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'right',
    color: colors.heading,
  },
});

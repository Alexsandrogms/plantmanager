import React from 'react';

import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '@styles/colors';
import fonts from '@styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps {
  text: string;
  active?: boolean;
}

export default function EnvironmentButton({
  text,
  active = false,
  ...rest
}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[styles.wrapper, active && styles.wrapperIsActive]}
      {...rest}
    >
      <Text style={[styles.text, active && styles.textIsActive]}>{text}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.shape,
    width: 76,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  wrapperIsActive: {
    backgroundColor: colors.green_light,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  textIsActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
});

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import colors from '@styles/colors';

interface ButtonProps extends RectButtonProps {
  text: string;
  disabled?: boolean;
}

export default function Button({ text, disabled, ...rest }: ButtonProps) {
  return (
    <RectButton
      style={[styles.button, disabled && styles.buttonDisabled]}
      {...rest}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 231,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'Jost_500Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 23,
    textAlign: 'center',
    color: colors.white,
  },
});

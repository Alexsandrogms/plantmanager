import React from 'react';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import { SvgFromUri } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Animated, StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

type Plant = {
  name: string;
  photo: string;
  hour: string;
};

interface PlantProps extends RectButtonProps {
  data: Plant;
  handleSwiperRemove: () => void;
}

export default function PlantCardSecondary({
  data,
  handleSwiperRemove,
  ...rest
}: PlantProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonSwiperRemove}
              onPress={handleSwiperRemove}
            >
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data.photo} width={37} height={41} />

        <Text style={styles.title}>{data.name}</Text>
        <View style={styles.details}>
          <Text style={styles.label}>Regar as</Text>
          <Text style={styles.timeLabel}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
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
  buttonSwiperRemove: {
    width: 100,
    height: 85,
    marginTop: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    right: 15,
    paddingLeft: 10,
    backgroundColor: colors.red,
  },
});

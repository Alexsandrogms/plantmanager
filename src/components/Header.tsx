import React, { useEffect, useState } from 'react';

import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useIsFocused } from '@react-navigation/core';

import fonts from '@styles/fonts';
import colors from '@styles/colors';
import { getImageProfile, getUsername } from '@utils/asyncStorage';
interface HeaderProps {
  title: string;
  subtitle?: string;
}

const { width: screenW } = Dimensions.get('window');

export default function Header({ title, subtitle }: HeaderProps) {
  const navigation = useNavigation().navigate;
  const isFocused = useIsFocused();

  const [username, setUsername] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const navigateToProfile = () => navigation('Profile');

  useEffect(() => {
    (async () => {
      const usernameStored = await getUsername();
      const imageStored = await getImageProfile();

      setUsername(usernameStored || '');
      setImage(imageStored || '');
    })();
  }, [isFocused]);

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle || username}</Text>
      </View>
      <RectButton onPress={navigateToProfile}>
        {image.length > 0 && (
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />
        )}
      </RectButton>
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

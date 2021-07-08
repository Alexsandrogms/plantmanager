import React, { useEffect, useState } from 'react';

import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useIsFocused } from '@react-navigation/core';

import fonts from '@styles/fonts';
import colors from '@styles/colors';
import { getImageProfile, getUsername } from '@utils/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface HeaderProps {
  title: string;
  subtitle?: string;
}

const { width: screenW } = Dimensions.get('window');

export default function Header({ title, subtitle }: HeaderProps) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [username, setUsername] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const navigateToProfile = () => navigation.navigate('Profile');

  useEffect(() => {
    (async () => {
      const usernameStored = await getUsername();
      const imageStored = await getImageProfile();

      await AsyncStorage.removeItem('@plantmanager:profile');

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
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.wrapperImage}>
            <Image
              source={require('@assets/profile.png')}
              style={styles.imageDefault}
              resizeMode="contain"
            />
          </View>
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
  imageDefault: {
    width: 70,
    height: 70,
  },
  wrapperImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    shadowColor: colors.shape,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    elevation: 2,
    shadowRadius: 16.0,
  },
});

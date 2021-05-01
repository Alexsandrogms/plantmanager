import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { SvgFromUri } from 'react-native-svg';
import { RectButton } from 'react-native-gesture-handler';

import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

import fonts from '@styles/fonts';
import colors from '@styles/colors';

import Button from './Button';

const { height: heightDefault } = Dimensions.get('window');

interface ProductFormatResultProps {
  show: boolean;
  type: 'success' | 'remove';
  plant: {
    image: string;
    name?: string;
  };
  onRemove?: () => void;
  onCancel?: () => void;
}

export default function Modal({
  type,
  plant,
  show,
  onCancel,
  onRemove,
}: ProductFormatResultProps) {
  const navigation = useNavigation().navigate;

  const [state] = useState({
    opacity: new Animated.Value(0),
    container: new Animated.Value(heightDefault),
    modal: new Animated.Value(heightDefault),
  });

  const openModal = () => {
    Animated.sequence([
      Animated.timing(state.container, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(state.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(state.modal, {
        toValue: heightDefault,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(state.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(state.container, {
        toValue: heightDefault,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }
  }, [show]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: state.opacity,
          transform: [{ translateY: state.container }],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.modal,
          {
            transform: [{ translateY: state.modal }],
          },
        ]}
      >
        <View style={styles.card}>
          <View style={styles.image}>
            <SvgFromUri uri={plant.image} width={120} height={120} />
          </View>
          <Text style={type === 'success' ? styles.title : styles.titleRemove}>
            {plant.name ? 'Deseja mesmo deletar sua' : 'Tudo certo'}
          </Text>
          <Text
            style={type === 'success' ? styles.subtitle : styles.subtitleRemove}
          >
            {plant.name ||
              'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.'}
          </Text>
          {type === 'remove' ? (
            <View style={styles.buttonsWrapper}>
              <RectButton style={styles.button} onPress={onCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </RectButton>
              <RectButton style={styles.button} onPress={onRemove}>
                <Text style={[styles.buttonText, { color: colors.red }]}>
                  Deletar
                </Text>
              </RectButton>
            </View>
          ) : (
            <Button
              text="Muito obrigado :D"
              onPress={() => {
                closeModal(), navigation('MyPlants');
              }}
            />
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.backgroundShadow,
    position: 'absolute',
  },
  modal: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    maxWidth: '85%',
    maxHeight: '50%',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    elevation: 8,
    shadowRadius: 16.0,
  },
  image: {
    backgroundColor: colors.shape,
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
    color: colors.heading,
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 12,
    color: colors.heading,
    textAlign: 'center',
    marginBottom: 20,
  },
  titleRemove: {
    fontFamily: fonts.text,
    fontSize: 17,
    color: colors.heading,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  subtitleRemove: {
    fontFamily: fonts.heading,
    fontSize: 16,
    fontWeight: '600',
    color: colors.heading,
    textAlign: 'center',
  },
  buttonsWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  button: {
    width: 96,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shape,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: fonts.text,
    fontSize: 13,
    lineHeight: 25,
    color: colors.heading,
  },
});

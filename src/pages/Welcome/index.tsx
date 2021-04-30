import React from 'react';

import { useNavigation } from '@react-navigation/core';
import { MaterialIcons } from '@expo/vector-icons';
import {
  SafeAreaView,
  Text,
  Image,
  View,
} from 'react-native';

import wateringImg from '@assets/watering.png';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';

export default function Welcome() {
  const navigation = useNavigation().navigate;

  const nextPage = () => navigation('Identification');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}
          Suas plantas de {'\n'}
          forma fácil
        </Text>

        <Image source={wateringImg} style={styles.image} resizeMode="contain" />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar
        </Text>

        <RectButton
          style={styles.button}
          activeOpacity={0.7}
          onPress={nextPage}
        >
          <Text>
            <MaterialIcons name="chevron-right" size={30} color="#fff" />
          </Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}

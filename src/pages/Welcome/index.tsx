import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import wateringImg from '@assets/watering.png';

import styles from './styles';

export function Welcome() {
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

        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text>
            <MaterialIcons name="chevron-right" size={30} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

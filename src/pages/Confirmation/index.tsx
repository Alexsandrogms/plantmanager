import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, Text, SafeAreaView, Image } from 'react-native';

import emojiHappyImg from '@assets/emoji-happy.png';
import { Button } from '@components';

import styles from './styles';

export default function Confirmation() {
  const navigation = useNavigation().navigate;

  const navigateToStart = () => navigation('PlantSelection');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={emojiHappyImg} />
        <View style={styles.body}>
          <Text style={styles.heading}>Prontinho</Text>
          <Text style={styles.subtitle}>
            Agora vamos começar a cuidar das suas {'\n'}
            plantinhas com muito cuidado.
          </Text>
        </View>
        <Button text="Começar" onPress={navigateToStart} />
      </View>
    </SafeAreaView>
  );
}

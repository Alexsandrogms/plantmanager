import React from 'react';

import { View, Text, SafeAreaView, Image } from 'react-native';

import emojiHappyImg from '@assets/emoji-happy.png';
import { Button } from '@components';

import styles from './styles';

export function Confirmation() {
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
        <Button text="Confirmar" />
      </View>
    </SafeAreaView>
  );
}
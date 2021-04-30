import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/core';
import {
  View,
  Text,
  Image,
  Platform,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import emojiSmileyImg from '@assets/emoji-smiley.png';
import emojiSmileImg from '@assets/emoji-smile.png';
import { Button } from '@components';

import styles from './styles';

export default function Identification() {
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState('');

  const navigation = useNavigation().navigate;

  const navigateTo = () => navigation('Confirmation');

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (text: string) => {
    setIsFocused(true);
    setName(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <Image
                source={!(isFocused || name) ? emojiSmileyImg : emojiSmileImg}
                style={styles.emoji}
              />

              <Text style={styles.heading}>Como podemos{'\n'}chamar você?</Text>
              <TextInput
                value={name}
                style={[
                  styles.input,
                  isFocused || name ? styles.inputActive : null,
                ]}
                placeholder="Digite um nome"
                placeholderTextColor="#ccc"
                onBlur={handleBlur}
                onChangeText={handleChangeText}
              />
              <Button
                text="Confirmar"
                disabled={name.length < 1}
                enabled={name.length > 1}
                onPress={navigateTo}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

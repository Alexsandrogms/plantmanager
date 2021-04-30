import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Platform,
} from 'react-native';

import emojiSmileyImg from '@assets/emoji-smiley.png';
import emojiSmileImg from '@assets/emoji-smile.png';
import { Button } from '@components';

import styles from './styles';

export function Identification() {
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState('');

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
            <Button text="Confirmar" disabled={name.length < 1} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

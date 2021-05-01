import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  Alert,
} from 'react-native';

import emojiSmileyImg from '@assets/emoji-smiley.png';
import emojiSmileImg from '@assets/emoji-smile.png';
import { Button } from '@components';

import styles from './styles';

export default function Identification() {
  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState('');

  const navigation = useNavigation().navigate;

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (text: string) => {
    setIsFocused(true);
    setName(text);
  };

  const handleSubmit = async () => {
    if (!name) {
      return Alert.alert('', 'Me diz como chamar você 😅');
    }

    try {
      await AsyncStorage.setItem('@plantmanager:username', name);
      navigation('Confirmation');
    } catch {
      Alert.alert('', 'Não foi possível salvar o nome do usuário! 😥');
    }
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
                enabled={name.length >= 1}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

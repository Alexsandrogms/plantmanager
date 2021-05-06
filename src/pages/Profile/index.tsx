import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getHours } from 'date-fns';
import {
  View,
  Text,
  Alert,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import plantImage from '@assets/plant.png';
import {
  getImageProfile,
  getUsername,
  saveImageProfile,
  updateUsername,
} from '@utils/asyncStorage';

import styles from './styles';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const navigation = useNavigation().goBack;

  const [image, setImage] = useState<string>('');
  const [username, setUsername] = useState<string>('Alexsandro');
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const checkToday = () => {
    const hour = getHours(new Date());

    return hour < 12
      ? 'Good Morning'
      : hour < 18
      ? 'good Afternoon'
      : 'Good Evening';
  };
  const handleSelectedImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      return Alert.alert(
        '',
        'Precisamos da sua permissão para acessar ás suas fotos 😅.'
      );
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) return;

    const { uri: image } = result;

    try {
      await saveImageProfile(image);
      setImage(image);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleEdit = () => setIsEdit((prevState) => !prevState);
  const handleChangeText = (text: string) => setUsername(text);
  const handleSubmit = async () => {
    try {
      await updateUsername(username);
      toggleEdit();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const imageStored = await getImageProfile();
        const usernameStored = await getUsername();

        setImage(imageStored || '');
        setUsername(usernameStored || '');
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <RectButton onPress={() => navigation()} style={styles.buttonGoBack}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#a9a9a9" />
        </RectButton>
      </View>
      <View style={styles.footer}>
        <View style={styles.card}>
          <RectButton onPress={toggleEdit} style={styles.cardButtonEdit}>
            {isEdit ? (
              <MaterialIcons name="close" size={30} />
            ) : (
              <MaterialIcons name="edit" size={30} />
            )}
          </RectButton>
          <RectButton
            onPress={handleSelectedImage}
            enabled={isEdit}
            style={[
              styles.cardImageWrapper,
              {
                backgroundColor: isEdit ? '#ff6969' : '#fff',
              },
            ]}
          >
            {image.length > 0 && (
              <Image
                source={{
                  uri: image,
                }}
                style={styles.cardImage}
              />
            )}
          </RectButton>
          <TextInput
            value={username}
            style={styles.input}
            placeholder="Digite um nome"
            placeholderTextColor="#ccc"
            onChangeText={handleChangeText}
            onSubmitEditing={handleSubmit}
            editable={isEdit}
          />
          <Text style={styles.cardTodayText}>{checkToday()}</Text>
        </View>
        <Image source={plantImage} />
      </View>
    </SafeAreaView>
  );
}

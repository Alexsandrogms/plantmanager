import React, { useState } from 'react';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { SvgFromUri } from 'react-native-svg';
import { StackScreenProps } from '@react-navigation/stack';
import { isBefore, format } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import {
  View,
  Text,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import waterDropImg from '@assets/waterdrop.png';
import clockImg from '@assets/clock.png';

import { Button, Modal } from '@components';

import styles from './styles';
import { useNavigation } from '@react-navigation/core';

type Plant = {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  dateTimeNotification: Date;
  frequency: {
    times: number;
    repeat_every: string;
  };
};

type StackParamList = {
  Plant: Plant;
};

type StoragePlantProps = {
  [id: string]: {
    data: Plant;
    notificationsId: string;
  };
};

type PlantProps = StackScreenProps<StackParamList, 'Plant'>;

export default function Plant({ route: { params } }: PlantProps) {
  const {
    name,
    about,
    photo,
    water_tips,
    frequency: { repeat_every, times },
  } = params;

  const goBack = useNavigation().goBack;

  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<Boolean>(
    Platform.OS == 'ios'
  );
  const [isSavePlant, setIsSavePlant] = useState(false);

  const handleChangeTime = (event: Event, dateTime: Date | undefined) => {
    const currentDate: Date = new Date();

    if (Platform.OS === 'android') {
      setShowDatePicker((prevState) => !prevState);
    }

    if (dateTime && isBefore(dateTime, currentDate)) {
      setSelectedDateTime(currentDate);
      return Alert.alert('Escolha uma hora futura! ⏰');
    }

    if (dateTime) setSelectedDateTime(dateTime);
  };

  const handleOpenDateTimePickerForAndroid = () => {
    setShowDatePicker((prevState) => !prevState);
  };

  const savePlant = async () => {
    try {
      const nextTime = new Date(selectedDateTime);
      const now = new Date();

      if (repeat_every == 'week') {
        const interval = Math.trunc(7 / times);
        nextTime.setDate(now.getDate() + interval);
      } else {
        nextTime.setDate(nextTime.getDate() + 1);
      }

      // diferença em segundos de um tempo pro outro
      const seconds = Math.abs(
        Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
      );

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Heeeey, 🌱',
          body: `Está na hora de cuidar da sua ${name}`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
          data: {
            plant: { ...params },
          },
        },
        trigger: {
          seconds: seconds < 60 ? 60 : seconds,
          repeats: true,
        },
      });

      const data = await AsyncStorage.getItem('@plantmanager:plants');
      const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

      const newPlants = {
        [params.id]: {
          data: {
            ...params,
            dateTimeNotification: selectedDateTime,
          },
          notificationId,
        },
      };

      await AsyncStorage.setItem(
        '@plantmanager:plants',
        JSON.stringify({ ...newPlants, ...oldPlants })
      );

      setIsSavePlant(true);
    } catch (error) {
      console.log(error);

      Alert.alert(
        '',
        'OPS 😅! Não foi possível salvar esta planta, tente novamente. '
      );
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <RectButton style={styles.buttonGoBack} onPress={() => goBack()}>
          <MaterialIcons
            name="chevron-left"
            size={40}
            style={styles.buttonIcon}
          />
        </RectButton>
        <View style={styles.heading}>
          <SvgFromUri uri={photo} width={156} height={176} />

          <Text style={styles.plantName}>{name}</Text>

          <Text style={styles.plantAbout}>{about}</Text>
        </View>
        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image source={waterDropImg} style={styles.tipImage} />
            <Text style={styles.tipText}>{water_tips}</Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado.
          </Text>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          )}

          {Platform.OS === 'android' && (
            <View style={styles.dateTimePickerWrapper}>
              <TouchableOpacity
                style={styles.dateTimePickerButton}
                onPress={handleOpenDateTimePickerForAndroid}
              >
                <Text>{format(selectedDateTime, 'HH:mm a')}</Text>
              </TouchableOpacity>
              <Image source={clockImg} width={24} height={24} />
            </View>
          )}

          <Button text="Cadastrar planta" width={311} onPress={savePlant} />
        </View>
        <Modal show={isSavePlant} type="success" plant={{ image: photo }} />
      </View>
    </ScrollView>
  );
}

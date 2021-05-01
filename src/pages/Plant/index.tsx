import React, { useState } from 'react';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { SvgFromUri } from 'react-native-svg';
import { StackScreenProps } from '@react-navigation/stack';
import { isBefore, format } from 'date-fns';

import {
  View,
  Text,
  Image,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';

import waterDropImg from '@assets/waterdrop.png';
import clockImg from '@assets/clock.png';

import { Button, Modal } from '@components';

import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Plant = {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: String[];
  frequency: {
    times: number;
    repeat_every: string;
  };
  dateTimeNotification: Date;
};

type StackParamList = {
  Plant: Plant;
};

type StoragePlantProps = {
  [id: string]: {
    data: Plant;
  };
};

type PlantProps = StackScreenProps<StackParamList, 'Plant'>;

export default function Plant({ route: { params } }: PlantProps) {
  const { name, about, photo, water_tips } = params;

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

    if (dateTime && isBefore(currentDate, dateTime)) {
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
      const data = await AsyncStorage.getItem('@plantmanager:plants');
      const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

      const newPlants = {
        [params.id]: {
          data: { ...params, dateTimeNotification: selectedDateTime },
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
    <View style={styles.container}>
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

        <Button 
          text="Cadastrar planta" 
          width={311} 
          onPress={savePlant}
        />
      </View>
      <Modal show={isSavePlant} type="success" image={photo} />
    </View>
  );
}

import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ptBR from 'date-fns/locale/pt-BR';

import { View, Text, Image, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/core';
import { format, formatDistance } from 'date-fns';

import waterDropImg from '@assets/waterdrop.png';

import { Header, Load, Modal, PlantCardSecondary, Error } from '@components';

import styles from './styles';

type Plant = {
  id: number;
  name: string;
  photo: string;
  dateTimeNotification: Date;
  hour: string;
};

type StoragePlantProps = {
  [id: string]: {
    data: Plant;
    notificationId: string;
  };
};

export default function MyPlants() {
  const [plantList, setPlantList] = useState<Plant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextPlantWarted, setNextPlantWarted] = useState<string>('');
  const [selectedPlantRemove, setSelectedPlantRemove] = useState<Plant>();
  const isFocused = useIsFocused();

  const loadPlants = async (): Promise<Plant[] | undefined> => {
    try {
      const data = await AsyncStorage.getItem('@plantmanager:plants');
      const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

      const plantsSorted = Object.keys(plants)
        .map((plant) => {
          return {
            ...plants[plant].data,
            hour: format(
              new Date(plants[plant].data.dateTimeNotification),
              'HH:mm'
            ),
          };
        })
        .sort((a, b) =>
          Math.floor(
            new Date(a.dateTimeNotification).getTime() / 1000 -
              Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
          )
        );

      return plantsSorted || [];
    } catch (error) {
      console.log(error);
    }
  };

  const onCancelRemove = () => setSelectedPlantRemove(undefined);

  const handleSwiperRemove = async () => {
    try {
      if (!selectedPlantRemove) return;

      const data = await AsyncStorage.getItem('@plantmanager:plants');
      const plantsStored = data ? (JSON.parse(data) as StoragePlantProps) : {};

      await Notifications.cancelScheduledNotificationAsync(
        plantsStored[selectedPlantRemove.id].notificationId
      );

      delete plantsStored[selectedPlantRemove.id];

      await AsyncStorage.setItem(
        '@plantmanager:plants',
        JSON.stringify(plantsStored)
      );

      setPlantList((prevState) =>
        prevState.filter((state) => state.id !== selectedPlantRemove.id)
      );
      setSelectedPlantRemove(undefined);
    } catch (error) {}
  };

  const handleSelectedPlantRemove = (plant: Plant) => {
    setSelectedPlantRemove(plant);
  };

  const isEmpty = (params: Object | undefined) => {
    return !params || Object.keys(params).length === 0;
  };

  useEffect(() => {
    (async () => {
      try {
        const plantsStored = await loadPlants();

        if (!plantsStored || plantsStored.length === 0) return;

        const nextPlantWater = formatDistance(
          new Date(plantsStored[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          {
            locale: ptBR,
          }
        );

        setNextPlantWarted(
          `Não esqueça de regar a ${plantsStored[0].name} a ${nextPlantWater}.`
        );

        setPlantList(plantsStored);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    })();
  }, [isFocused]);

  if (loading) return <Load />;

  return (
    <>
      <View style={styles.container}>
        <Header title="Minhas" subtitle="Plantinhas" image="" />

        {plantList.length ? (
          <>
            <View style={styles.spotlight}>
              <Image source={waterDropImg} style={styles.spotlightImage} />

              <Text style={styles.spotlightText}>{nextPlantWarted}</Text>
            </View>

            <View style={styles.plantList}>
              <Text style={styles.plantListTitle}>Próximas regadas</Text>

              <FlatList
                data={plantList}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <PlantCardSecondary
                    data={item}
                    handleSwiperRemove={() => handleSelectedPlantRemove(item)}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </>
        ) : (
          <Error />
        )}
      </View>
      <Modal
        show={!isEmpty(selectedPlantRemove)}
        type="remove"
        plant={{
          image: selectedPlantRemove?.photo || '',
          name: `${selectedPlantRemove?.name}?`,
        }}
        onRemove={handleSwiperRemove}
        onCancel={onCancelRemove}
      />
    </>
  );
}

import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ptBR from 'date-fns/locale/pt-BR';

import { View, Text, Image, FlatList } from 'react-native';
import { format, formatDistance } from 'date-fns';

import waterDropImg from '@assets/waterdrop.png';

import { Header, Load, PlantCardSecondary } from '@components';

import styles from './styles';

type Plant = {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: String[];
  dateTimeNotification: Date;
  hour: string;
  frequency: {
    times: number;
    repeat_every: string;
  };
};

type StoragePlantProps = {
  [id: string]: {
    data: Plant;
  };
};

export default function MyPlants() {
  const [plantList, setPlantList] = useState<Plant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextPlantWarted, setNextPlantWarted] = useState<string>('');

  const loadPlants = async (): Promise<Plant[]> => {
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

      return plantsSorted;
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const plantsStored = await loadPlants();

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
  }, []);

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <Header title="Minhas" subtitle="Plantinhas" image="" />

      <View style={styles.spotlight}>
        <Image source={waterDropImg} style={styles.spotlightImage} />

        <Text style={styles.spotlightText}>{nextPlantWarted}</Text>
      </View>

      <View style={styles.plantList}>
        <Text style={styles.plantListTitle}>Próximas regadas</Text>

        <FlatList
          data={plantList}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PlantCardSecondary data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

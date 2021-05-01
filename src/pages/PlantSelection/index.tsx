import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import emojiHappyImg from '@assets/emoji-happy.png';
import api from '@services/api';

import { EnvironmentButton, Header, PlantCardPrimary, Load } from '@components';

import styles from './styles';

type EnvironmentData = {
  key: string;
  title: string;
};

type PlantData = {
  id: number;
  name: string;
  photo: string;
  environments: String[];
};

export default function PlanSelection() {
  const navigation = useNavigation().navigate;

  const [environments, setEnvironments] = useState<EnvironmentData[]>([]);
  const [plants, setPlants] = useState<PlantData[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantData[]>([]);

  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const getPlans = async () => {
    const { data } = await api.get('plants', {
      params: {
        _sort: 'name',
        _order: 'asc',
        _page: page,
        _limit: 8,
      },
    });

    if (!data) return setLoading(true);

    if (page > 1) {
      setPlants((prevState) => [...prevState, ...data]);
      setFilteredPlants((prevState) => [...prevState, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  };

  const setFilter = (filter: string) => {
    setEnvironmentSelected(filter);

    if (filter === 'all') {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter((plant) =>
      plant.environments.includes(filter)
    );

    setFilteredPlants(filtered);
  };

  const handleFetchMore = (distance: number) => {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((prevState) => prevState + 1);
    getPlans();
  };

  const handleSelectPlant = (plant: PlantData) => {
    return navigation('Plant', plant);
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.get('plants_environments', {
        params: {
          _sort: 'title',
          _order: 'asc',
        },
      });

      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data,
      ]);
    })();
  }, []);

  useEffect(() => {
    getPlans();
  }, []);

  if (loading) return <Load />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Header
          title="Olá,"
          subtitle="Alexsandro Gomes Paiva"
          image={emojiHappyImg}
        />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View style={styles.list}>
        <FlatList
          data={environments}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View key={item.key} style={styles.itemSeparator}>
              <EnvironmentButton
                text={item.title}
                active={item.key === environmentSelected}
                onPress={() => setFilter(item.key)}
              />
            </View>
          )}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handleSelectPlant(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color="#32B768" /> : <></>
          }
        />
      </View>
    </SafeAreaView>
  );
}

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUsername = async (username: string) => {
  try {
    await AsyncStorage.setItem('@plantmanager:username', username);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUsername = async () => {
  try {
    return await AsyncStorage.getItem('@plantmanager:username');
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUsername = async (username: string) => {
  try {
    await AsyncStorage.setItem('@plantmanager:username', username);
  } catch (error) {
    throw new Error(error);
  }
};

export const getImageProfile = async () => {
  try {
    return await AsyncStorage.getItem('@plantmanager:profile');
  } catch (error) {
    throw new Error(error);
  }
};

export const saveImageProfile = async (image: string) => {
  try {
    image && (await AsyncStorage.setItem('@plantmanager:profile', image));
  } catch (error) {
    throw new Error(error);
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const uriDefault =
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540alexgms%252Fplantmanager/ImagePicker/218727e8-2b3f-4581-a22c-e0585955e5fa.jpg';

    await AsyncStorage.setItem('@plantmanager:profile', image || uriDefault);
  } catch (error) {
    throw new Error(error);
  }
};

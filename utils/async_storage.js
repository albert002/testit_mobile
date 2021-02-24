import { AsyncStorage } from 'react-native';
export const setItem = async (name, value) => {
  console.log('set', name, value);
  try {
    await AsyncStorage.setItem(name, value);
  } catch (error) {
    console.log(error);
  }
};
export const getItem = async name => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};

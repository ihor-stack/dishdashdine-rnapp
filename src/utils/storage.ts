import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  setItem(key: string, val: any) {
    return AsyncStorage.setItem(key, JSON.stringify(val));
  },
  removeItem(key: string) {
    return AsyncStorage.removeItem(key);
  },
  async getItem(key: string) {
    try {
      const json: any = await AsyncStorage.getItem(key);
      return JSON.parse(json);
    } catch (error) {
      return null;
    }
  },
  clearStorage() {
    return AsyncStorage.clear();
  },
};

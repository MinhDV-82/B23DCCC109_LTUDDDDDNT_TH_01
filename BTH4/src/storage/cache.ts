import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CacheItem<T> {
  data: T;
  savedAt: string;
}

export async function getCache<T = any>(key: string): Promise<CacheItem<T> | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as CacheItem<T>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function setCache<T = any>(key: string, data: T): Promise<void> {
  try {
    const item: CacheItem<T> = {
      data,
      savedAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(error);
  }
}

export async function removeCache(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
}

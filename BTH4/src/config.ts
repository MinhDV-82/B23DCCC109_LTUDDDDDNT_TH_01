import { Platform } from 'react-native';

const URL = 'http://localhost:3001'

export const BASE_URL = Platform.select({
  android: URL,
  ios: URL,
  default: URL,
});

export const TIMEOUT = 10000;
export const CACHE_TTL = 1000 * 60 * 60 * 24;


import AsyncStorage from '@react-native-async-storage/async-storage';
import { OUTBOX_KEY } from './keys';
import { HttpMethod } from '../api/client';

export interface OutboxAction {
  id: string;
  method: HttpMethod;
  url: string;
  body: any;
  createdAt: string;
}

export async function getAll(): Promise<OutboxAction[]> {
  try {
    const raw = await AsyncStorage.getItem(OUTBOX_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as OutboxAction[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function enqueue(
  action: Omit<OutboxAction, 'id' | 'createdAt'>
): Promise<OutboxAction> {
  try {
    const currentQueue = await getAll();
    const newAction: OutboxAction = {
      ...action,
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    const updatedQueue = [...currentQueue, newAction];
    await AsyncStorage.setItem(OUTBOX_KEY, JSON.stringify(updatedQueue));
    return newAction;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const currentQueue = await getAll();
    const updatedQueue = currentQueue.filter((item) => item.id !== id);
    await AsyncStorage.setItem(OUTBOX_KEY, JSON.stringify(updatedQueue));
  } catch (error) {
    console.error(error);
  }
}

export async function clear(): Promise<void> {
  try {
    await AsyncStorage.removeItem(OUTBOX_KEY);
  } catch (error) {
    console.error(error);
  }
}
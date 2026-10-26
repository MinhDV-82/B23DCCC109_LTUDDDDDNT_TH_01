import { useState, useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { getAll, remove } from '../storage/outbox';
import { request } from '../api/client';
import { useNetworkStatus } from './useNetworkStatus';

export function useOutboxSync(onSyncSuccess?: () => void) {
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [syncing, setSyncing] = useState<boolean>(false);
  const { isOnline } = useNetworkStatus();
  const prevOnlineRef = useRef<boolean>(isOnline);

  const refreshPendingCount = useCallback(async () => {
    const queue = await getAll();
    setPendingCount(queue.length);
  }, []);

  const syncNow = useCallback(async () => {
    if (syncing) return;
    const queue = await getAll();
    if (queue.length === 0) {
      setPendingCount(0);
      return;
    }

    setSyncing(true);
    let successCount = 0;

    for (const action of queue) {
      try {
        if (action.url.includes('/students') && action.method === 'PATCH') {
          try {
            const serverStudent = await request('GET', '/students/1');
            if (
              serverStudent.updatedAt &&
              new Date(serverStudent.updatedAt).getTime() > new Date(action.createdAt).getTime()
            ) {
              Alert.alert(
                'Xung đột dữ liệu',
                'Thông tin cá nhân trên máy chủ đã được cập nhật mới hơn thao tác ngoại tuyến của bạn. Hệ thống sẽ giữ dữ liệu máy chủ.'
              );
              await remove(action.id);
              continue;
            }
          } catch {}
        }

        await request(action.method, action.url, action.body);
        await remove(action.id);
        successCount++;
      } catch (error) {
        console.warn(error);
        break;
      }
    }

    setSyncing(false);
    await refreshPendingCount();

    if (successCount > 0) {
      Alert.alert('Đồng bộ thành công', `Đã đồng bộ ${successCount} thay đổi lên máy chủ.`);
      if (onSyncSuccess) {
        onSyncSuccess();
      }
    }
  }, [syncing, refreshPendingCount, onSyncSuccess]);

  useEffect(() => {
    if (!prevOnlineRef.current && isOnline) {
      syncNow();
    }
    prevOnlineRef.current = isOnline;
  }, [isOnline, syncNow]);

  useEffect(() => {
    refreshPendingCount();
  }, [refreshPendingCount]);

  return {
    pendingCount,
    syncing,
    syncNow,
    refreshPendingCount,
  };
}


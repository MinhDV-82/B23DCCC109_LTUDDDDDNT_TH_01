import { useState, useEffect, useCallback } from 'react';
import { getCache, setCache } from '../storage/cache';
import { useNetworkStatus } from './useNetworkStatus';

export function useCachedQuery<T = any>(
  cacheKey: string,
  fetcher: () => Promise<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const { isOnline } = useNetworkStatus();

  const loadData = useCallback(async (isPullToRefresh = false) => {
    if (isPullToRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const cached = await getCache<T>(cacheKey);
      if (cached) {
        setData(cached.data);
        setLastUpdated(cached.savedAt);
        setLoading(false);
      }
    } catch (e) {
      console.warn(e);
    }

    try {
      const result = await fetcher();
      setData(result);
      const nowIso = new Date().toISOString();
      setLastUpdated(nowIso);
      await setCache(cacheKey, result);
    } catch (err: any) {
      const cached = await getCache<T>(cacheKey);
      if (!cached) {
        setError(err.message || 'Không thể tải dữ liệu từ máy chủ.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [cacheKey, fetcher]);

  useEffect(() => {
    loadData();
  }, [loadData, isOnline]);

  const refresh = useCallback(() => {
    return loadData(true);
  }, [loadData]);

  return {
    data,
    loading,
    error,
    refreshing,
    lastUpdated,
    refresh,
    setData,
  };
}


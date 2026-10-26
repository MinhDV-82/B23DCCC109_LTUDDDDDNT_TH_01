import React, { createContext, useContext, ReactNode } from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useOutboxSync } from '../hooks/useOutboxSync';

interface SyncContextType {
  isOnline: boolean;
  pendingCount: number;
  syncing: boolean;
  syncNow: () => Promise<void>;
  refreshPendingCount: () => Promise<void>;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export function SyncProvider({
  children,
  onSyncSuccess,
}: {
  children: ReactNode;
  onSyncSuccess?: () => void;
}) {
  const { isOnline } = useNetworkStatus();
  const { pendingCount, syncing, syncNow, refreshPendingCount } = useOutboxSync(onSyncSuccess);

  return (
    <SyncContext.Provider
      value={{
        isOnline,
        pendingCount,
        syncing,
        syncNow,
        refreshPendingCount,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
}

export function useSync() {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSync phải được dùng bên trong SyncProvider');
  }
  return context;
}
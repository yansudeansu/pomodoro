import { useState, useEffect } from 'react';
import { StatusEntry } from '../components/organisms/StatusHistory/StatusHistory';
import { STATUS_URL } from '../constants';

export const useStatusHistory = () => {
  const [showStatus, setShowStatus] = useState(false);
  const [statusHistory, setStatusHistory] = useState<StatusEntry[] | null>(null);

  useEffect(() => {
    if (!STATUS_URL) return;

    if (!showStatus) {
      setStatusHistory(null);
      return;
    }

    if (typeof fetch !== 'function') {
      setStatusHistory([]);
      return;
    }

    const fetchStatus = async () => {
      try {
        const res = await fetch(STATUS_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: StatusEntry[] = await res.json();
        setStatusHistory(data);
      } catch {
        setStatusHistory([]);
      }
    };

    fetchStatus();
  }, [showStatus]);

  const handleStatusClick = () => setShowStatus((prev) => !prev);
  const handleCloseStatusModal = () => setShowStatus(false);

  return {
    showStatus,
    statusHistory,
    handleStatusClick,
    handleCloseStatusModal,
  };
};

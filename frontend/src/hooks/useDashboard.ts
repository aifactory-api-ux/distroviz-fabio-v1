import { useState, useEffect, useCallback } from 'react';
import { DashboardMetrics } from '../types/dashboard-metrics';
import { fetchDashboardMetrics } from '../api/dashboard';

interface UseDashboardResult {
  metrics: DashboardMetrics | null;
  loading: boolean;
  error: string | null;
  refreshDashboard: () => Promise<void>;
}

export function useDashboard(): UseDashboardResult {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDashboardMetrics();
      setMetrics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network Error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshDashboard();
  }, []);

  return { metrics, loading, error, refreshDashboard };
}
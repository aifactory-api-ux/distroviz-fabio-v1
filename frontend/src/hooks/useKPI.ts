import { useState, useEffect, useCallback } from 'react';
import { KPI } from '../types/kpi';
import { fetchKPI } from '../api/kpi';

export function useKPI(): {
  kpi: KPI | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
} {
  const [kpi, setKpi] = useState<KPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadKPI = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchKPI();
      setKpi(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load KPI');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadKPI();
  }, [loadKPI]);

  return {
    kpi,
    loading,
    error,
    refresh: loadKPI,
  };
}
import { KPI } from '../types/kpi';

const API_URL = import.meta.env.VITE_KPI_API_URL || 'http://localhost:23002';

export async function fetchKPI(): Promise<KPI> {
  const response = await fetch(`${API_URL}/api/kpi`);
  if (!response.ok) {
    throw new Error('Failed to fetch KPI');
  }
  return response.json();
}
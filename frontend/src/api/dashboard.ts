import { DashboardMetrics } from '../types/dashboard-metrics';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:23001/api';

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  const response = await fetch(`${API_BASE_URL}/dashboard`);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
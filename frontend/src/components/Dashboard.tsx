import React from 'react';
import { DashboardMetrics } from '../types/dashboard-metrics';

interface DashboardProps {
  metrics: DashboardMetrics | null;
  loading: boolean;
}

export function Dashboard({ metrics, loading }: DashboardProps) {
  if (loading) {
    return <div data-testid="loading-indicator">Loading dashboard metrics...</div>;
  }

  if (!metrics) {
    return <div>No metrics available</div>;
  }

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Dashboard Metrics</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        <div>
          <strong>Total Orders:</strong> {metrics.total_orders}
        </div>
        <div>
          <strong>Pending:</strong> {metrics.pending_orders}
        </div>
        <div>
          <strong>Dispatched:</strong> {metrics.dispatched_orders}
        </div>
        <div>
          <strong>Delivered:</strong> {metrics.delivered_orders}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Orders by Plant</h3>
        <ul>
          {Object.entries(metrics.orders_by_plant).map(([plant, count]) => (
            <li key={plant}>{plant}: {count}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Orders by Distribution Center</h3>
        <ul>
          {Object.entries(metrics.orders_by_distribution_center).map(([dc, count]) => (
            <li key={dc}>{dc}: {count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
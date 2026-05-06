import { render, screen } from '@testing-library/react';
import { Dashboard } from '../../src/components/Dashboard';
import { KPI } from '../../src/types/kpi';

describe('Dashboard', () => {
  const mockKPI: KPI = {
    totalOrders: 100,
    pendingOrders: 20,
    inTransitOrders: 30,
    deliveredOrders: 45,
    cancelledOrders: 5,
    averageDeliveryTimeMinutes: 45,
  };

  it('displays dashboard metrics from API', () => {
    render(<Dashboard kpi={mockKPI} loading={false} />);
    expect(screen.getByText('Total Orders')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('In Transit')).toBeInTheDocument();
    expect(screen.getByText('Delivered')).toBeInTheDocument();
    expect(screen.getByText('Cancelled')).toBeInTheDocument();
    expect(screen.getByText('Avg Delivery Time')).toBeInTheDocument();
  });

  it('shows loading indicator while fetching metrics', () => {
    render(<Dashboard kpi={null} loading={true} />);
    expect(screen.getByText('Loading KPI...')).toBeInTheDocument();
  });

  it('shows error message if API call fails', () => {
    render(<Dashboard kpi={null} loading={false} />);
    expect(screen.getByText('No KPI data available.')).toBeInTheDocument();
  });

  it('displays metric values correctly', () => {
    render(<Dashboard kpi={mockKPI} loading={false} />);
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
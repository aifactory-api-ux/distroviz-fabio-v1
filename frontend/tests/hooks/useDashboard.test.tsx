import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDashboard } from '../../src/hooks/useDashboard';

const mockFetchDashboardMetrics = jest.fn();
jest.mock('../../src/api/dashboard', () => ({
  fetchDashboardMetrics: () => mockFetchDashboardMetrics(),
}));

describe('useDashboard', () => {
  beforeEach(() => {
    mockFetchDashboardMetrics.mockClear();
  });

  it('returns dashboard metrics on successful fetch', async () => {
    const mockMetrics = {
      total_orders: 100,
      pending_orders: 20,
      dispatched_orders: 30,
      delivered_orders: 45,
      orders_by_plant: {},
      orders_by_distribution_center: {},
    };
    mockFetchDashboardMetrics.mockResolvedValue(mockMetrics);

    let hookResult: any;
    function TestComponent() {
      hookResult = useDashboard();
      return null;
    }

    render(<TestComponent />);
    await waitFor(() => {
      expect(hookResult.metrics).toEqual(mockMetrics);
    });
  });

  it('sets loading true while fetching', async () => {
    mockFetchDashboardMetrics.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({}), 100))
    );

    let hookResult: any;
    function TestComponent() {
      hookResult = useDashboard();
      return null;
    }

    render(<TestComponent />);
    expect(hookResult.loading).toBe(true);
    await waitFor(() => {
      expect(hookResult.loading).toBe(false);
    });
  });

  it('returns error on API failure', async () => {
    mockFetchDashboardMetrics.mockRejectedValue(new Error('Network Error'));

    let hookResult: any;
    function TestComponent() {
      hookResult = useDashboard();
      return null;
    }

    render(<TestComponent />);
    await waitFor(() => {
      expect(hookResult.error).toBe('Network Error');
    });
  });
});
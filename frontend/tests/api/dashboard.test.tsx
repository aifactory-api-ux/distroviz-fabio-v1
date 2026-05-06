import { fetchDashboardMetrics } from '../../src/api/dashboard';

global.fetch = jest.fn();

describe('Dashboard API', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('fetchDashboardMetrics returns dashboard metrics on 200', async () => {
    const mockMetrics = {
      total_orders: 100,
      pending_orders: 20,
      dispatched_orders: 30,
      delivered_orders: 45,
      orders_by_plant: {},
      orders_by_distribution_center: {},
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockMetrics),
    });

    const result = await fetchDashboardMetrics();
    expect(result).toEqual(mockMetrics);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/dashboard'));
  });

  it('throws error on non-200 response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchDashboardMetrics()).rejects.toThrow('API Error: 500');
  });

  it('handles network error gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchDashboardMetrics()).rejects.toThrow('Network Error');
  });
});
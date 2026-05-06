import { render, screen, waitFor } from '@testing-library/react';
import { useOrders } from '../../src/hooks/useOrders';
import { OrderCreate } from '../../src/types/order';

const mockFetchOrders = jest.fn();
const mockCreateOrder = jest.fn();
const mockUpdateOrderStatus = jest.fn();
const mockDeleteOrder = jest.fn();

jest.mock('../../src/api/orders', () => ({
  fetchOrders: () => mockFetchOrders(),
  createOrder: (order: OrderCreate) => mockCreateOrder(order),
  updateOrderStatus: (id: number, status: any) => mockUpdateOrderStatus(id, status),
  deleteOrder: (id: number) => mockDeleteOrder(id),
}));

describe('useOrders', () => {
  beforeEach(() => {
    mockFetchOrders.mockClear();
    mockCreateOrder.mockClear();
    mockUpdateOrderStatus.mockClear();
    mockDeleteOrder.mockClear();
  });

  it('returns orders array on successful fetch', async () => {
    const mockOrders = [
      {
        id: 1,
        customerName: 'John',
        address: '123 Main St',
        status: 'pending' as const,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        items: [],
      },
    ];
    mockFetchOrders.mockResolvedValue(mockOrders);

    let hookResult: any;
    function TestComponent() {
      hookResult = useOrders();
      return null;
    }

    render(<TestComponent />);
    await waitFor(() => {
      expect(hookResult.orders).toEqual(mockOrders);
    });
  });

  it('sets loading true while fetching', async () => {
    mockFetchOrders.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 100))
    );

    let hookResult: any;
    function TestComponent() {
      hookResult = useOrders();
      return null;
    }

    render(<TestComponent />);
    expect(hookResult.loading).toBe(true);
    await waitFor(() => {
      expect(hookResult.loading).toBe(false);
    });
  });

  it('returns error on API failure', async () => {
    mockFetchOrders.mockRejectedValue(new Error('Failed to load orders'));

    let hookResult: any;
    function TestComponent() {
      hookResult = useOrders();
      return null;
    }

    render(<TestComponent />);
    await waitFor(() => {
      expect(hookResult.error).toBe('Failed to load orders');
    });
  });
});
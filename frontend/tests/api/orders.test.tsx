import {
  fetchOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from '../../src/api/orders';
import { OrderCreate } from '../../src/types/order';

global.fetch = jest.fn();

describe('Orders API', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('fetchOrders returns array of orders on 200', async () => {
    const mockOrders = [
      {
        id: 1,
        customerName: 'John',
        address: '123 Main St',
        status: 'pending',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        items: [],
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockOrders),
    });

    const result = await fetchOrders();
    expect(result).toEqual(mockOrders);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/orders'));
  });

  it('createOrder returns order on 201', async () => {
    const mockOrder: OrderCreate = {
      customerName: 'John',
      address: '123 Main St',
      items: [],
    };
    const mockResponse = { id: 1, ...mockOrder, status: 'pending' };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await createOrder(mockOrder);
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/orders'),
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('createOrder throws error on validation failure', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    await expect(createOrder({ customerName: '', address: '', items: [] })).rejects.toThrow(
      'Failed to create order'
    );
  });

  it('updateOrderStatus updates and returns order', async () => {
    const mockResponse = { id: 1, status: 'delivered' };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await updateOrderStatus(1, { status: 'delivered' });
    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/orders/1/status'),
      expect.objectContaining({ method: 'PATCH' })
    );
  });

  it('deleteOrder returns success', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const result = await deleteOrder(1);
    expect(result).toEqual({ success: true });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/orders/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});
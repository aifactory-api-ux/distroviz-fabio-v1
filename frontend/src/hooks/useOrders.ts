import { useState, useEffect, useCallback } from 'react';
import { Order, OrderCreate, OrderUpdateStatus } from '../types/order';
import {
  fetchOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from '../api/orders';

export function useOrders(): {
  orders: Order[];
  loading: boolean;
  error: string | null;
  createOrder: (order: OrderCreate) => Promise<void>;
  updateOrderStatus: (id: number, status: OrderUpdateStatus) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
  deletingId: number | null;
} {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const createOrderFn = useCallback(async (order: OrderCreate) => {
    await createOrder(order);
    await loadOrders();
  }, [loadOrders]);

  const updateOrderStatusFn = useCallback(
    async (id: number, status: OrderUpdateStatus) => {
      await updateOrderStatus(id, status);
      await loadOrders();
    },
    [loadOrders],
  );

  const deleteOrderFn = useCallback(
    async (id: number) => {
      setDeletingId(id);
      try {
        await deleteOrder(id);
        await loadOrders();
      } finally {
        setDeletingId(null);
      }
    },
    [loadOrders],
  );

  return {
    orders,
    loading,
    error,
    createOrder: createOrderFn,
    updateOrderStatus: updateOrderStatusFn,
    deleteOrder: deleteOrderFn,
    deletingId,
  };
}
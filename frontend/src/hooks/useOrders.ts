import { useState, useEffect } from 'react';
import { Order } from '../types/order';
import { CreateOrder } from '../types/create-order';
import { fetchOrders, createOrder as createOrderApi } from '../api/orders';

interface UseOrdersResult {
  orders: Order[];
  loading: boolean;
  error: string | null;
  createOrder: (data: CreateOrder) => Promise<void>;
  refreshOrders: () => Promise<void>;
}

export function useOrders(): UseOrdersResult {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network Error');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (data: CreateOrder) => {
    try {
      setError(null);
      await createOrderApi(data);
      await refreshOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network Error');
      throw err;
    }
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  return { orders, loading, error, createOrder, refreshOrders };
}
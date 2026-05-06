import { Order, OrderCreate, OrderUpdateStatus } from '../types/order';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:23001';

export async function fetchOrders(): Promise<Order[]> {
  const response = await fetch(`${API_URL}/api/orders`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
}

export async function fetchOrder(id: number): Promise<Order> {
  const response = await fetch(`${API_URL}/api/orders/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }
  return response.json();
}

export async function createOrder(order: OrderCreate): Promise<Order> {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
}

export async function updateOrderStatus(
  id: number,
  status: OrderUpdateStatus,
): Promise<Order> {
  const response = await fetch(`${API_URL}/api/orders/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(status),
  });
  if (!response.ok) {
    throw new Error('Failed to update order status');
  }
  return response.json();
}

export async function deleteOrder(id: number): Promise<{ success: boolean }> {
  const response = await fetch(`${API_URL}/api/orders/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete order');
  }
  return response.json();
}
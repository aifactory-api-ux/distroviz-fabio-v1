import React from 'react';
import { Order } from '../types/order';

interface OrderListProps {
  orders: Order[];
  loading: boolean;
}

export function OrderList({ orders, loading }: OrderListProps) {
  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div data-testid="empty-state" style={{ padding: '20px', textAlign: 'center' }}>
        No orders found
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Orders</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Product</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Quantity</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Plant</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Distribution Center</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{order.id}</td>
              <td style={{ padding: '10px' }}>{order.product_name}</td>
              <td style={{ padding: '10px' }}>{order.quantity}</td>
              <td style={{ padding: '10px' }}>{order.plant}</td>
              <td style={{ padding: '10px' }}>{order.distribution_center}</td>
              <td style={{ padding: '10px' }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: order.status === 'pending' ? '#ffc107' : order.status === 'dispatched' ? '#17a2b8' : '#28a745',
                  color: '#fff'
                }}>
                  {order.status}
                </span>
              </td>
              <td style={{ padding: '10px' }}>{new Date(order.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
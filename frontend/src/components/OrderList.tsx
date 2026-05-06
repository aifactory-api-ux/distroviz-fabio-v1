import { Order, OrderUpdateStatus } from '../types/order';
import { OrderStatusBadge } from './OrderStatusBadge';

interface OrderListProps {
  orders: Order[];
  onUpdateStatus: (id: number, status: OrderUpdateStatus) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

export function OrderList({
  orders,
  onUpdateStatus,
  onDelete,
  deletingId,
}: OrderListProps) {
  const statuses: Array<'pending' | 'in_transit' | 'delivered' | 'cancelled'> = [
    'pending',
    'in_transit',
    'delivered',
    'cancelled',
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '16px' }}>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>ID</th>
              <th style={{ padding: '8px' }}>Customer</th>
              <th style={{ padding: '8px' }}>Address</th>
              <th style={{ padding: '8px' }}>Status</th>
              <th style={{ padding: '8px' }}>Items</th>
              <th style={{ padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{order.id}</td>
                <td style={{ padding: '8px' }}>{order.customerName}</td>
                <td style={{ padding: '8px' }}>{order.address}</td>
                <td style={{ padding: '8px' }}>
                  <OrderStatusBadge status={order.status} />
                </td>
                <td style={{ padding: '8px' }}>
                  {order.items.length} item(s)
                  <br />
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    Total: $
                    {order.items
                      .reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
                      .toFixed(2)}
                  </span>
                </td>
                <td style={{ padding: '8px' }}>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      onUpdateStatus(order.id, {
                        status: e.target.value as OrderUpdateStatus['status'],
                      })
                    }
                    style={{ padding: '4px', marginRight: '8px' }}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => onDelete(order.id)}
                    disabled={deletingId === order.id}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      cursor: deletingId === order.id ? 'not-allowed' : 'pointer',
                      opacity: deletingId === order.id ? 0.6 : 1,
                    }}
                  >
                    {deletingId === order.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
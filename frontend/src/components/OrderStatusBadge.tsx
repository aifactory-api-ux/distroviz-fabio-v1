import React from 'react';

interface OrderStatusBadgeProps {
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    pending: { backgroundColor: '#fbbf24', color: '#000' },
    in_transit: { backgroundColor: '#3b82f6', color: '#fff' },
    delivered: { backgroundColor: '#22c55e', color: '#fff' },
    cancelled: { backgroundColor: '#ef4444', color: '#fff' },
  };

  const labels: Record<string, string> = {
    pending: 'Pending',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };

  return (
    <span
      style={{
        padding: '4px 12px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: '600',
        ...styles[status],
      }}
    >
      {labels[status]}
    </span>
  );
}
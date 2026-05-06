import { KPI } from '../types/kpi';

interface DashboardProps {
  kpi: KPI | null;
  loading: boolean;
}

export function Dashboard({ kpi, loading }: DashboardProps) {
  if (loading) {
    return <p>Loading KPI...</p>;
  }

  if (!kpi) {
    return <p>No KPI data available.</p>;
  }

  const cards = [
    { label: 'Total Orders', value: kpi.totalOrders, color: '#3b82f6' },
    { label: 'Pending', value: kpi.pendingOrders, color: '#fbbf24' },
    { label: 'In Transit', value: kpi.inTransitOrders, color: '#3b82f6' },
    { label: 'Delivered', value: kpi.deliveredOrders, color: '#22c55e' },
    { label: 'Cancelled', value: kpi.cancelledOrders, color: '#ef4444' },
    {
      label: 'Avg Delivery Time',
      value: `${kpi.averageDeliveryTimeMinutes} min`,
      color: '#8b5cf6',
    },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '16px' }}>KPI Dashboard</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              padding: '20px',
              backgroundColor: card.color,
              color: '#fff',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'normal' }}>
              {card.label}
            </h3>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
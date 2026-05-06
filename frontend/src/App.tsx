import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { OrderList } from './components/OrderList';
import { OrderForm } from './components/OrderForm';
import { useDashboard } from './hooks/useDashboard';
import { useOrders } from './hooks/useOrders';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { metrics, loading: dashboardLoading, error: dashboardError, refreshDashboard } = useDashboard();
  const { orders, loading: ordersLoading, error: ordersError, createOrder, refreshOrders } = useOrders();

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000'
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>DistroViz - Distribution Visualization</h1>
        <button
          data-testid="theme-switcher"
          onClick={toggleTheme}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: theme === 'dark' ? '#444' : '#ddd',
            color: theme === 'dark' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>

      <Dashboard metrics={metrics} loading={dashboardLoading} />
      {dashboardError && <div style={{ color: 'red', padding: '10px' }}>Error: {dashboardError}</div>}

      <OrderList orders={orders} loading={ordersLoading} />
      {ordersError && <div style={{ color: 'red', padding: '10px' }}>Error: {ordersError}</div>}

      <OrderForm
        onSubmit={async (data) => {
          await createOrder(data);
          await refreshDashboard();
          await refreshOrders();
        }}
        loading={ordersLoading}
      />
    </div>
  );
}

export default App;
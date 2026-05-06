import { Dashboard } from './components/Dashboard';
import { OrderForm } from './components/OrderForm';
import { OrderList } from './components/OrderList';
import { useOrders } from './hooks/useOrders';
import { useKPI } from './hooks/useKPI';
import './styles/main.css';

export default function App() {
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    deletingId,
  } = useOrders();

  const { kpi, loading: kpiLoading } = useKPI();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Order Management System</h1>
      </header>

      <main className="app-main">
        {ordersError && <p className="error-message">Error: {ordersError}</p>}

        <section className="dashboard-section">
          <Dashboard kpi={kpi} loading={kpiLoading} />
        </section>

        <section className="order-form-section">
          <OrderForm onSubmit={createOrder} loading={ordersLoading} />
        </section>

        <section className="order-list-section">
          {ordersLoading && orders.length === 0 ? (
            <p>Loading orders...</p>
          ) : (
            <OrderList
              orders={orders}
              onUpdateStatus={updateOrderStatus}
              onDelete={deleteOrder}
              deletingId={deletingId}
            />
          )}
        </section>
      </main>
    </div>
  );
}
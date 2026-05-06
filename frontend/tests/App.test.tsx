import { render, screen } from '@testing-library/react';
import App from '../src/App';

jest.mock('../src/hooks/useOrders', () => ({
  useOrders: () => ({
    orders: [],
    loading: false,
    error: null,
    createOrder: jest.fn(),
    updateOrderStatus: jest.fn(),
    deleteOrder: jest.fn(),
    deletingId: null,
  }),
}));

jest.mock('../src/hooks/useKPI', () => ({
  useKPI: () => ({
    kpi: null,
    loading: false,
  }),
}));

describe('App', () => {
  it('renders dashboard, orderlist and orderform components', () => {
    render(<App />);
    expect(screen.getByText('KPI Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Create Order')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });

  it('renders header with title', () => {
    render(<App />);
    expect(screen.getByText('Order Management System')).toBeInTheDocument();
  });

  it('displays error message when there is an orders error', () => {
    (jest.requireMock('../src/hooks/useOrders') as any).useOrders.mockReturnValueOnce({
      orders: [],
      loading: false,
      error: 'Failed to load',
      createOrder: jest.fn(),
      updateOrderStatus: jest.fn(),
      deleteOrder: jest.fn(),
      deletingId: null,
    });
    render(<App />);
    expect(screen.getByText('Error: Failed to load')).toBeInTheDocument();
  });

  it('displays loading state when orders are loading', () => {
    (jest.requireMock('../src/hooks/useOrders') as any).useOrders.mockReturnValueOnce({
      orders: [],
      loading: true,
      error: null,
      createOrder: jest.fn(),
      updateOrderStatus: jest.fn(),
      deleteOrder: jest.fn(),
      deletingId: null,
    });
    render(<App />);
    expect(screen.getByText('Loading orders...')).toBeInTheDocument();
  });
});
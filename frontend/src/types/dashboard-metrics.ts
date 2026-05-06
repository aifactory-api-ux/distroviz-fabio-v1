export interface DashboardMetrics {
  total_orders: number;
  pending_orders: number;
  dispatched_orders: number;
  delivered_orders: number;
  orders_by_plant: Record<string, number>;
  orders_by_distribution_center: Record<string, number>;
}
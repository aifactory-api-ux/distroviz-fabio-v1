export interface KPI {
  totalOrders: number;
  deliveredOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  inTransitOrders: number;
  averageDeliveryTimeMinutes: number;
}
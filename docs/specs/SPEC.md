# SPEC.md

## 1. TECHNOLOGY STACK

- **Backend**
  - Node.js v20.11.1
  - NestJS v10.2.7
  - TypeScript v5.3.3
  - PostgreSQL v15.5
  - Redis v7.2.4
  - RabbitMQ v3.13.1
- **Frontend**
  - React v18.2.0
  - TypeScript v5.3.3
  - Vite v5.2.0
- **Infrastructure**
  - Docker v25.0.3
  - docker-compose v2.24.6
  - Kubernetes v1.29.2

## 2. DATA CONTRACTS

### Backend (TypeScript/NestJS) — DTOs

```typescript
// backend/order-service/src/orders/dto/order.dto.ts
export interface Order {
  id: number;
  customerName: string;
  address: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderCreate {
  customerName: string;
  address: string;
  items: OrderItemCreate[];
}

export interface OrderItemCreate {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderUpdateStatus {
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
}
```

### Frontend (TypeScript/React) — Interfaces

```typescript
// frontend/src/types/order.ts
export interface Order {
  id: number;
  customerName: string;
  address: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderCreate {
  customerName: string;
  address: string;
  items: OrderItemCreate[];
}

export interface OrderItemCreate {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderUpdateStatus {
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
}
```

### Shared KPI Model

```typescript
// backend/shared/kpi.dto.ts
export interface KPI {
  totalOrders: number;
  deliveredOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  inTransitOrders: number;
  averageDeliveryTimeMinutes: number;
}
```

```typescript
// frontend/src/types/kpi.ts
export interface KPI {
  totalOrders: number;
  deliveredOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  inTransitOrders: number;
  averageDeliveryTimeMinutes: number;
}
```

## 3. API ENDPOINTS

### Orders API

#### List Orders

- **GET** `/api/orders`
  - **Request:** None
  - **Response:** `Order[]`

#### Get Order by ID

- **GET** `/api/orders/:id`
  - **Request:** None
  - **Response:** `Order`

#### Create Order

- **POST** `/api/orders`
  - **Request Body:** `OrderCreate`
  - **Response:** `Order`

#### Update Order Status

- **PATCH** `/api/orders/:id/status`
  - **Request Body:** `OrderUpdateStatus`
  - **Response:** `Order`

#### Delete Order

- **DELETE** `/api/orders/:id`
  - **Request:** None
  - **Response:** `{ success: boolean }`

### KPI Dashboard API

#### Get KPIs

- **GET** `/api/kpi`
  - **Request:** None
  - **Response:** `KPI`

## 4. FILE STRUCTURE

### PORT TABLE

| Service           | Listening Port | Path                        |
|-------------------|---------------|-----------------------------|
| order-service     | 23001         | backend/order-service/      |
| kpi-service       | 23002         | backend/kpi-service/        |

### SHARED MODULES

| Shared path         | Imported by services           |
|---------------------|-------------------------------|
| backend/shared/     | order-service, kpi-service    |

### FILE TREE

```
.
├── backend/
│   ├── shared/                                 # Shared DTOs and utilities
│   │   ├── kpi.dto.ts                         # KPI interface
│   │   └── index.ts                           # Exports for shared modules
│   ├── order-service/
│   │   ├── src/
│   │   │   ├── main.ts                        # NestJS entrypoint
│   │   │   ├── app.module.ts                  # Root module
│   │   │   ├── orders/
│   │   │   │   ├── orders.controller.ts       # Orders REST controller
│   │   │   │   ├── orders.service.ts          # Orders business logic
│   │   │   │   ├── orders.module.ts           # Orders module
│   │   │   │   ├── dto/
│   │   │   │   │   ├── order.dto.ts           # Order interfaces
│   │   │   │   │   └── index.ts               # DTO exports
│   │   │   │   └── entities/
│   │   │   │       ├── order.entity.ts        # TypeORM entity
│   │   │   │       └── order-item.entity.ts   # TypeORM entity
│   │   │   ├── database/
│   │   │   │   └── database.module.ts         # DB connection config
│   │   │   └── redis/
│   │   │       └── redis.module.ts            # Redis connection
│   │   ├── Dockerfile                         # Docker build for order-service
│   │   ├── .env.example                       # Env vars template
│   │   └── README.md                          # Service documentation
│   ├── kpi-service/
│   │   ├── src/
│   │   │   ├── main.ts                        # NestJS entrypoint
│   │   │   ├── app.module.ts                  # Root module
│   │   │   ├── kpi/
│   │   │   │   ├── kpi.controller.ts          # KPI REST controller
│   │   │   │   ├── kpi.service.ts             # KPI business logic
│   │   │   │   ├── kpi.module.ts              # KPI module
│   │   │   │   └── dto/
│   │   │   │       ├── kpi.dto.ts             # KPI interfaces
│   │   │   │       └── index.ts               # DTO exports
│   │   │   ├── database/
│   │   │   │   └── database.module.ts         # DB connection config
│   │   │   └── redis/
│   │   │       └── redis.module.ts            # Redis connection
│   │   ├── Dockerfile                         # Docker build for kpi-service
│   │   ├── .env.example                       # Env vars template
│   │   └── README.md                          # Service documentation
│   └── shared/
│       ├── kpi.dto.ts                         # Shared KPI DTO
│       └── index.ts                           # Shared exports
├── frontend/
│   ├── public/
│   │   └── index.html                         # HTML entrypoint
│   ├── src/
│   │   ├── main.tsx                           # React entrypoint
│   │   ├── App.tsx                            # Root component
│   │   ├── api/
│   │   │   ├── orders.ts                      # Orders API client
│   │   │   └── kpi.ts                         # KPI API client
│   │   ├── components/
│   │   │   ├── Dashboard.tsx                  # KPI dashboard
│   │   │   ├── OrderForm.tsx                  # Order creation form
│   │   │   ├── OrderList.tsx                  # Orders table/list
│   │   │   └── OrderStatusBadge.tsx           # Status badge
│   │   ├── hooks/
│   │   │   ├── useOrders.ts                   # Orders state hook
│   │   │   └── useKPI.ts                      # KPI state hook
│   │   ├── types/
│   │   │   ├── order.ts                       # Order interfaces
│   │   │   └── kpi.ts                         # KPI interface
│   │   └── styles/
│   │       └── main.css                       # Global styles
│   ├── Dockerfile                             # Docker build for frontend
│   ├── .env.example                           # Env vars template
│   └── README.md                              # Frontend documentation
├── docker-compose.yml                         # Multi-service orchestration
├── start.sh                                   # Startup script for all services
├── .env.example                               # Root env vars template
├── .gitignore                                 # Git ignore rules
└── README.md                                  # Project overview
```

## 5. ENVIRONMENT VARIABLES

### Root `.env.example`

| Name                | Type   | Description                                 | Example Value           |
|---------------------|--------|---------------------------------------------|------------------------|
| NODE_ENV            | string | Node environment                            | production             |
| POSTGRES_HOST       | string | PostgreSQL host                             | postgres               |
| POSTGRES_PORT       | int    | PostgreSQL port                             | 5432                   |
| POSTGRES_USER       | string | PostgreSQL username                         | distroviz              |
| POSTGRES_PASSWORD   | string | PostgreSQL password                         | secret                 |
| POSTGRES_DB         | string | PostgreSQL database name                    | distroviz_db           |
| REDIS_HOST          | string | Redis host                                  | redis                  |
| REDIS_PORT          | int    | Redis port                                  | 6379                   |
| RABBITMQ_HOST       | string | RabbitMQ host                               | rabbitmq               |
| RABBITMQ_PORT       | int    | RabbitMQ port                               | 5672                   |

### `backend/order-service/.env.example` and `backend/kpi-service/.env.example`

| Name                | Type   | Description                                 | Example Value           |
|---------------------|--------|---------------------------------------------|------------------------|
| SERVICE_PORT        | int    | Service listening port                      | 23001 (order), 23002 (kpi) |
| POSTGRES_HOST       | string | PostgreSQL host                             | postgres               |
| POSTGRES_PORT       | int    | PostgreSQL port                             | 5432                   |
| POSTGRES_USER       | string | PostgreSQL username                         | distroviz              |
| POSTGRES_PASSWORD   | string | PostgreSQL password                         | secret                 |
| POSTGRES_DB         | string | PostgreSQL database name                    | distroviz_db           |
| REDIS_HOST          | string | Redis host                                  | redis                  |
| REDIS_PORT          | int    | Redis port                                  | 6379                   |
| RABBITMQ_HOST       | string | RabbitMQ host                               | rabbitmq               |
| RABBITMQ_PORT       | int    | RabbitMQ port                               | 5672                   |

### `frontend/.env.example`

| Name                | Type   | Description                                 | Example Value           |
|---------------------|--------|---------------------------------------------|------------------------|
| VITE_API_URL        | string | Base URL for backend API                    | http://localhost:23001 |

## 6. IMPORT CONTRACTS

### Backend

```typescript
// backend/order-service/src/orders/dto/order.dto.ts
export { Order, OrderItem, OrderCreate, OrderItemCreate, OrderUpdateStatus } from './order.dto';

// backend/shared/kpi.dto.ts
export { KPI } from './kpi.dto';

// backend/order-service/src/orders/orders.service.ts
export class OrdersService {
  findAll(): Promise<Order[]>;
  findOne(id: number): Promise<Order>;
  create(order: OrderCreate): Promise<Order>;
  updateStatus(id: number, status: OrderUpdateStatus): Promise<Order>;
  remove(id: number): Promise<{ success: boolean }>;
}

// backend/kpi-service/src/kpi/kpi.service.ts
export class KPIService {
  getKPI(): Promise<KPI>;
}
```

### Frontend

```typescript
// frontend/src/hooks/useOrders.ts
export function useOrders(): {
  orders: Order[];
  loading: boolean;
  error: string | null;
  createOrder: (order: OrderCreate) => Promise<void>;
  updateOrderStatus: (id: number, status: OrderUpdateStatus) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;
  deletingId: number | null;
};

// frontend/src/hooks/useKPI.ts
export function useKPI(): {
  kpi: KPI | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};
```

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### Shared State Primitives

```
React hook: useOrders() → {
  orders,
  loading,
  error,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  deletingId
}

React hook: useKPI() → {
  kpi,
  loading,
  error,
  refresh
}
```

### Reusable Components

```
OrderList props/inputs: {
  orders: Order[],
  onUpdateStatus: (id: number, status: OrderUpdateStatus) => void,
  onDelete: (id: number) => void,
  deletingId: number | null
}

OrderForm props/inputs: {
  onSubmit: (data: OrderCreate) => void,
  loading: boolean
}

Dashboard props/inputs: {
  kpi: KPI | null,
  loading: boolean
}

OrderStatusBadge props/inputs: {
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled'
}
```

## 8. FILE EXTENSION CONVENTION

- **Frontend files:** `.tsx` (TypeScript React)
- **Backend files:** `.ts` (TypeScript)
- **Project language:** TypeScript (no JavaScript files)
- **Entry point:** `/src/main.tsx` (as referenced in `<script type="module" src="/src/main.tsx"></script>` in `frontend/public/index.html`)
# SPEC.md

## 1. TECHNOLOGY STACK

- **Backend**
  - Node.js v20.x
  - NestJS v10.x
  - TypeScript v5.x
  - PostgreSQL v15.x (database)
  - Redis v7.x (cache)
- **Frontend**
  - React v18.x
  - TypeScript v5.x
- **Infrastructure**
  - Docker v24.x
  - docker-compose v2.x

---

## 2. DATA CONTRACTS

### Backend (NestJS/TypeScript)

```typescript
// backend/src/orders/dto/order.dto.ts
export interface Order {
  id: number;
  product_name: string;
  quantity: number;
  plant: string;
  distribution_center: string;
  status: 'pending' | 'dispatched' | 'delivered';
  created_at: string; // ISO8601
  updated_at: string; // ISO8601
}

// backend/src/dashboard/dto/dashboard-metrics.dto.ts
export interface DashboardMetrics {
  total_orders: number;
  pending_orders: number;
  dispatched_orders: number;
  delivered_orders: number;
  orders_by_plant: Record<string, number>;
  orders_by_distribution_center: Record<string, number>;
}
```

### Frontend (React/TypeScript)

```typescript
// frontend/src/types/order.ts
export interface Order {
  id: number;
  product_name: string;
  quantity: number;
  plant: string;
  distribution_center: string;
  status: 'pending' | 'dispatched' | 'delivered';
  created_at: string; // ISO8601
  updated_at: string; // ISO8601
}

// frontend/src/types/dashboard-metrics.ts
export interface DashboardMetrics {
  total_orders: number;
  pending_orders: number;
  dispatched_orders: number;
  delivered_orders: number;
  orders_by_plant: Record<string, number>;
  orders_by_distribution_center: Record<string, number>;
}
```

### Order Creation DTO

```typescript
// backend/src/orders/dto/create-order.dto.ts
export interface CreateOrderDto {
  product_name: string;
  quantity: number;
  plant: string;
  distribution_center: string;
}
```

```typescript
// frontend/src/types/create-order.ts
export interface CreateOrder {
  product_name: string;
  quantity: number;
  plant: string;
  distribution_center: string;
}
```

---

## 3. API ENDPOINTS

### GET /api/dashboard

- **Method:** GET
- **Path:** /api/dashboard
- **Request Body:** None
- **Response:**
  - Status: 200 OK
  - Body: `DashboardMetrics` (see Data Contracts)

```json
{
  "total_orders": 120,
  "pending_orders": 30,
  "dispatched_orders": 60,
  "delivered_orders": 30,
  "orders_by_plant": {
    "Plant A": 50,
    "Plant B": 70
  },
  "orders_by_distribution_center": {
    "DC North": 60,
    "DC South": 60
  }
}
```

---

### GET /api/orders

- **Method:** GET
- **Path:** /api/orders
- **Request Body:** None
- **Response:**
  - Status: 200 OK
  - Body: `Order[]` (see Data Contracts)

```json
[
  {
    "id": 1,
    "product_name": "Producto X",
    "quantity": 100,
    "plant": "Plant A",
    "distribution_center": "DC North",
    "status": "pending",
    "created_at": "2024-06-01T12:00:00Z",
    "updated_at": "2024-06-01T12:00:00Z"
  }
]
```

---

### POST /api/orders

- **Method:** POST
- **Path:** /api/orders
- **Request Body:** `CreateOrderDto` (see Data Contracts)
- **Response:**
  - Status: 201 Created
  - Body: `Order` (see Data Contracts)

```json
{
  "id": 2,
  "product_name": "Producto Y",
  "quantity": 50,
  "plant": "Plant B",
  "distribution_center": "DC South",
  "status": "pending",
  "created_at": "2024-06-01T13:00:00Z",
  "updated_at": "2024-06-01T13:00:00Z"
}
```

---

## 4. FILE STRUCTURE

### PORT TABLE

| Service    | Listening Port | Path                      |
|------------|---------------|---------------------------|
| api        | 23001         | backend/                  |

### FILE TREE

```
.
├── backend/
│   ├── Dockerfile                # Docker build for NestJS API
│   ├── src/
│   │   ├── main.ts               # NestJS entry point
│   │   ├── app.module.ts         # Root module
│   │   ├── orders/
│   │   │   ├── orders.controller.ts   # Orders API controller
│   │   │   ├── orders.service.ts      # Orders business logic
│   │   │   ├── orders.module.ts       # Orders module
│   │   │   ├── dto/
│   │   │   │   ├── order.dto.ts           # Order interface
│   │   │   │   └── create-order.dto.ts    # CreateOrderDto interface
│   │   ├── dashboard/
│   │   │   ├── dashboard.controller.ts    # Dashboard API controller
│   │   │   ├── dashboard.service.ts       # Dashboard business logic
│   │   │   ├── dashboard.module.ts        # Dashboard module
│   │   │   └── dto/
│   │   │       └── dashboard-metrics.dto.ts # DashboardMetrics interface
│   │   ├── database/
│   │   │   ├── database.module.ts         # PostgreSQL connection module
│   │   │   └── entities/
│   │   │       └── order.entity.ts        # TypeORM entity for Order
│   │   ├── cache/
│   │   │   ├── cache.module.ts            # Redis connection module
│   │   │   └── cache.service.ts           # Redis cache service
│   ├── .env.example                  # Backend environment variables template
│   ├── tsconfig.json                 # TypeScript config
│   ├── package.json                  # NPM dependencies
│   └── README.md                     # Backend documentation
├── frontend/
│   ├── Dockerfile                    # Docker build for React app
│   ├── public/
│   │   ├── index.html                # HTML entry point
│   ├── src/
│   │   ├── main.tsx                  # React entry point
│   │   ├── App.tsx                   # Root component
│   │   ├── components/
│   │   │   ├── Dashboard.tsx         # Dashboard metrics display
│   │   │   ├── OrderList.tsx         # List of orders
│   │   │   ├── OrderForm.tsx         # Form to create new order
│   │   ├── hooks/
│   │   │   ├── useDashboard.ts       # Dashboard state hook
│   │   │   └── useOrders.ts          # Orders state hook
│   │   ├── types/
│   │   │   ├── order.ts              # Order interface
│   │   │   ├── create-order.ts       # CreateOrder interface
│   │   │   └── dashboard-metrics.ts  # DashboardMetrics interface
│   │   ├── api/
│   │   │   ├── dashboard.ts          # Dashboard API client
│   │   │   └── orders.ts             # Orders API client
│   ├── .env.example                  # Frontend environment variables template
│   ├── tsconfig.json                 # TypeScript config
│   ├── package.json                  # NPM dependencies
│   └── README.md                     # Frontend documentation
├── docker-compose.yml                # Multi-service orchestration
├── run.sh                            # Startup script for local dev
├── .gitignore                        # Ignore node_modules, build, env, etc.
└── README.md                         # Project overview
```

---

## 5. ENVIRONMENT VARIABLES

### backend/.env.example

```
# PostgreSQL
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=distroviz
POSTGRES_PASSWORD=supersecret
POSTGRES_DB=distroviz

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# NestJS
PORT=23001
NODE_ENV=development
```

### frontend/.env.example

```
# API base URL
VITE_API_URL=http://localhost:23001/api
```

### docker-compose.yml (host-side ports in 21000–65000 range)

- **POSTGRES_PORT:** 25432 (host) → 5432 (container)
- **REDIS_PORT:** 26379 (host) → 6379 (container)
- **API_PORT:** 23001 (host) → 23001 (container)
- **FRONTEND_PORT:** 24000 (host) → 80 (container)

---

## 6. IMPORT CONTRACTS

### Backend

```typescript
// Orders
import { Order } from './orders/dto/order.dto';
import { CreateOrderDto } from './orders/dto/create-order.dto';

// Dashboard
import { DashboardMetrics } from './dashboard/dto/dashboard-metrics.dto';

// Database
import { OrderEntity } from './database/entities/order.entity';

// Cache
import { CacheService } from './cache/cache.service';

// Controllers/Services
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { DashboardService } from './dashboard/dashboard.service';
import { DashboardController } from './dashboard/dashboard.controller';
```

### Frontend

```typescript
// Types
import { Order } from '../types/order';
import { CreateOrder } from '../types/create-order';
import { DashboardMetrics } from '../types/dashboard-metrics';

// Hooks
import { useOrders } from '../hooks/useOrders';
import { useDashboard } from '../hooks/useDashboard';

// API
import { fetchOrders, createOrder } from '../api/orders';
import { fetchDashboardMetrics } from '../api/dashboard';

// Components
import { Dashboard } from '../components/Dashboard';
import { OrderList } from '../components/OrderList';
import { OrderForm } from '../components/OrderForm';
```

---

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### React Hooks

```typescript
// useOrders() → { orders, loading, error, createOrder, refreshOrders }
useOrders() → {
  orders: Order[];
  loading: boolean;
  error: string | null;
  createOrder: (data: CreateOrder) => Promise<void>;
  refreshOrders: () => Promise<void>;
}

// useDashboard() → { metrics, loading, error, refreshDashboard }
useDashboard() → {
  metrics: DashboardMetrics | null;
  loading: boolean;
  error: string | null;
  refreshDashboard: () => Promise<void>;
}
```

### Components

```typescript
// Dashboard  props: { metrics: DashboardMetrics | null, loading: boolean }
Dashboard props: {
  metrics: DashboardMetrics | null;
  loading: boolean;
}

// OrderList  props: { orders: Order[], loading: boolean }
OrderList props: {
  orders: Order[];
  loading: boolean;
}

// OrderForm  props: { onSubmit: (data: CreateOrder) => void, loading: boolean }
OrderForm props: {
  onSubmit: (data: CreateOrder) => void;
  loading: boolean;
}
```

---

## 8. FILE EXTENSION CONVENTION

- **Frontend files:** `.tsx` (TypeScript React)
- **Backend files:** `.ts` (TypeScript)
- **Project language:** TypeScript (no JavaScript files)
- **Frontend entry point:** `/src/main.tsx` (as referenced in `public/index.html`)

---

**All field names, types, and API contracts must be used verbatim as specified above. All host-side ports in docker-compose.yml must be in the 21000–65000 range. All shared state and component prop names must match exactly as declared.**
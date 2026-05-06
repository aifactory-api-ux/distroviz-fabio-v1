# MASTER DEVELOPMENT PLAN

> Fuente de verdad única. Los nombres de clases, fields, rutas y variables
> definidos en §1 son los ÚNICOS válidos — el coder no puede inventar nombres.
> En §2 cada wave muestra 🔴 TEST primero y 🟢 PROD después: escríbelos en ese orden.

---

# §1 Contratos Globales

## §1.1 Especificación Técnica — Stack, Modelos, Estructura, Env Vars

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

## §1.2 Contrato API (OpenAPI 3.1)
> Ref obligatoria para tests de endpoints: usa los paths, schemas y status codes exactos de aquí.

```yaml
# API_CONTRACT.md

## Endpoints

---

### 1. GET /api/dashboard

| Property         | Value                |
|------------------|---------------------|
| HTTP Method      | GET                 |
| Path             | /api/dashboard      |
| Auth Required    | No                  |
| Request Body     | None                |
| Response Status  | 200 OK              |
| Response Body    | [`DashboardMetrics`](#dashboardmetrics-schema) |

#### DashboardMetrics Schema

| Field                              | Type                     | Required |
|-------------------------------------|--------------------------|----------|
| total_orders                       | number                   | Yes      |
| pending_orders                     | number                   | Yes      |
| dispatched_orders                  | number                   | Yes      |
| delivered_orders                   | number                   | Yes      |
| orders_by_plant                    | Record<string, number>   | Yes      |
| orders_by_distribution_center      | Record<string, number>   | Yes      |

---

### 2. GET /api/orders

| Property         | Value                |
|------------------|---------------------|
| HTTP Method      | GET                 |
| Path             | /api/orders         |
| Auth Required    | No                  |
| Request Body     | None                |
| Response Status  | 200 OK              |
| Response Body    | Array of [`Order`](#order-schema) |

#### Order Schema

| Field                | Type                                             | Required |
|----------------------|--------------------------------------------------|----------|
| id                   | number                                           | Yes      |
| product_name         | string                                           | Yes      |
| quantity             | number                                           | Yes      |
| plant                | string                                           | Yes      |
| distribution_center  | string                                           | Yes      |
| status               | 'pending' \| 'dispatched' \| 'delivered'         | Yes      |
| created_at           | string (ISO8601)                                 | Yes      |
| updated_at           | string (ISO8601)                                 | Yes      |

---

### 3. POST /api/orders

| Property         | Value                |
|------------------|---------------------|
| HTTP Method      | POST                |
| Path             | /api/orders         |
| Auth Required    | No                  |
| Request Body     | [`CreateOrderDto`](#createorderdto-schema) |
| Response Status  | 201 Created         |
| Response Body    | [`Order`](#order-schema) |

#### CreateOrderDto Schema

| Field                | Type     | Required |
|----------------------|----------|----------|
| product_name         | string   | Yes      |
| quantity             | number   | Yes      |
| plant                | string   | Yes      |
| distribution_center  | string   | Yes      |

---

## Schemas

### DashboardMetrics

```typescript
export interface DashboardMetrics {
  total_orders: number;
  pending_orders: number;
  dispatched_orders: number;
  delivered_orders: number;
  orders_by_plant: Record<string, number>;
  orders_by_distribution_center: Record<string, number>;
}
```

### Order

```typescript
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
```

### CreateOrderDto

```typescript
export interface CreateOrderDto {
  product_name: string;
  quantity: number;
  plant: string;
  distribution_center: string;
}
```
```

## §1.3 Archivos de Test y Scripts a Crear (TDD — complemento de la estructura §1.1)
> La FILE STRUCTURE de §1.1 fue generada antes de los specs TDD — no incluye `tests/` ni `run_tests.sh`.
> Los siguientes archivos son OBLIGATORIOS. Créalos en los paths exactos indicados.
> ⚠️  NUNCA usar archivos `.spec.*` co-ubicados con el source.

**Scripts de ejecución (crear y hacer chmod +x):**
- `backend/src/run_tests.sh`
- `frontend/run_tests.sh`
- `tests/run_tests.sh`

**Archivos de test (crear en los paths exactos):**
- `backend/src/cache/tests/test_cache_module.py`
- `backend/src/cache/tests/test_cache_service.py`
- `backend/src/dashboard/dto/tests/test_dashboard_metrics_dto.py`
- `backend/src/dashboard/tests/test_dashboard.controller.py`
- `backend/src/dashboard/tests/test_dashboard.service.py`
- `backend/src/database/entities/tests/test_order_entity.py`
- `backend/src/database/tests/test_database_module.py`
- `backend/src/orders/dto/tests/test_create_order_dto.py`
- `backend/src/orders/dto/tests/test_order_dto.py`
- `backend/src/orders/tests/test_orders.controller.py`
- `backend/src/orders/tests/test_orders.service.py`
- `frontend/tests/App.test.tsx`
- `frontend/tests/api/dashboard.test.tsx`
- `frontend/tests/api/orders.test.tsx`
- `frontend/tests/components/Dashboard.test.tsx`
- `frontend/tests/components/OrderForm.test.tsx`
- `frontend/tests/components/OrderList.test.tsx`
- `frontend/tests/hooks/useDashboard.test.tsx`
- `frontend/tests/hooks/useOrders.test.tsx`
- `frontend/tests/main.test.tsx`
- `frontend/tests/package.test.tsx`
- `frontend/tests/public/index.test.tsx`
- `frontend/tests/readme.test.tsx`
- `tests/test_docker_compose.py`
- `tests/test_readme_md.py`
- `tests/test_run_sh.py`

---

# §2 Plan de Implementación

> **REGLA TDD OBLIGATORIA**
> 1. Escribe el ítem 🔴 TEST completo antes de tocar el ítem 🟢 PROD.
> 2. Corre los tests: deben fallar (RED). Si pasan sin código de producción, el test está mal.
> 3. Escribe el código de producción mínimo para que pasen (GREEN).
> 4. Si los tests fallan después del paso 3, corrige SOLO producción — nunca los tests.

## Wave 1

### 🟢 PROD — run_tests.sh — backend/src
> Crea el archivo `backend/src/run_tests.sh` con el siguiente contenido EXACTO (no lo modifiques ni resumas):
**Archivos:**
  - `backend/src/run_tests.sh`

**Detalle:**
```bash
#!/bin/bash
set -e
cd "$(dirname "$0")"
echo ">>> [backend/src] Installing Python test dependencies..."
pip install pytest pytest-cov pytest-asyncio httpx anyio aiosqlite     fastapi sqlalchemy pyjwt passlib bcrypt python-multipart -q 2>/dev/null || true
# Install project deps declared in requirements.txt if present
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt -q 2>/dev/null || true
fi
echo ">>> [backend/src] Running tests..."
# Override DB URLs to SQLite in-memory so tests run without a live database
export DATABASE_URL="sqlite+aiosqlite:///:memory:"
export ASYNC_DATABASE_URL="sqlite+aiosqlite:///:memory:"
export DB_URL="sqlite:///:memory:"
export TEST_DATABASE_URL="sqlite+aiosqlite:///:memory:"
export SECRET_KEY="test-secret-key"
export JWT_SECRET="test-secret-key"
# Add service dir + parent dirs to PYTHONPATH so both relative and package imports work
# This handles: microservice layout (from routes import ...) and
#               monolith layout (from app.routers.auth import ...)
export PYTHONPATH="$(pwd):$(dirname $(pwd)):$(dirname $(dirname $(pwd))):${PYTHONPATH:-}"
mkdir -p coverage
python -m pytest tests/ --tb=short -q \
  --cov=. --cov-report=term-missing \
  --cov-report=json:coverage/coverage.json \
  --no-header 2>&1 | tee /tmp/test_out_backend_src.txt
echo ">>> [backend/src] Done."
```

Luego ejecuta: `chmod +x backend/src/run_tests.sh`

### 🟢 PROD — run_tests.sh — frontend
> Crea el archivo `frontend/run_tests.sh` con el siguiente contenido EXACTO (no lo modifiques ni resumas):
**Archivos:**
  - `frontend/run_tests.sh`

**Detalle:**
```bash
#!/bin/bash
set -e
cd "$(dirname "$0")"
echo ">>> [frontend] Installing JS test dependencies..."
npm install -D jest ts-jest @types/jest jest-environment-jsdom --silent 2>/dev/null || true
echo ">>> [frontend] Running tests..."
npx jest --coverage --passWithNoTests 2>&1 | tee /tmp/test_out_frontend.txt
echo ">>> [frontend] Done."
```

Luego ejecuta: `chmod +x frontend/run_tests.sh`

### 🟢 PROD — run_tests.sh — tests
> Crea el archivo `tests/run_tests.sh` con el siguiente contenido EXACTO (no lo modifiques ni resumas):
**Archivos:**
  - `tests/run_tests.sh`

**Detalle:**
```bash
#!/bin/bash
set -e
cd "$(dirname "$0")"
echo ">>> [tests] Installing Python test dependencies..."
pip install pytest pytest-cov pytest-asyncio httpx anyio aiosqlite     fastapi sqlalchemy pyjwt passlib bcrypt python-multipart -q 2>/dev/null || true
# Install project deps declared in requirements.txt if present
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt -q 2>/dev/null || true
fi
echo ">>> [tests] Running tests..."
# Override DB URLs to SQLite in-memory so tests run without a live database
export DATABASE_URL="sqlite+aiosqlite:///:memory:"
export ASYNC_DATABASE_URL="sqlite+aiosqlite:///:memory:"
export DB_URL="sqlite:///:memory:"
export TEST_DATABASE_URL="sqlite+aiosqlite:///:memory:"
export SECRET_KEY="test-secret-key"
export JWT_SECRET="test-secret-key"
# Add service dir + parent dirs to PYTHONPATH so both relative and package imports work
# This handles: microservice layout (from routes import ...) and
#               monolith layout (from app.routers.auth import ...)
export PYTHONPATH="$(pwd):$(dirname $(pwd)):$(dirname $(dirname $(pwd))):${PYTHONPATH:-}"
mkdir -p coverage
python -m pytest tests/ --tb=short -q \
  --cov=. --cov-report=term-missing \
  --cov-report=json:coverage/coverage.json \
  --no-header 2>&1 | tee /tmp/test_out_tests.txt
echo ">>> [tests] Done."
```

Luego ejecuta: `chmod +x tests/run_tests.sh`

### 🔴 TEST — Tests: backend/src/orders/dto/order.dto.ts
> Ref: §1.1 (modelos de `backend/src/orders/dto/order.dto.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/orders/dto/tests/test_order_dto.py`

**Casos de prueba (implementar todos):**
- `test_order_dto_valid_data_creates_instance`: Creating an Order DTO with all required fields and valid values should succeed and all fields should be accessible.
  - Input: `{'id': 1, 'product_name': 'Producto X', 'quantity': 100, 'plant': 'Plant A', 'distribution_center': 'DC North', 'status': 'pending', 'created_at': '2024-06-01T12:00:00Z', 'updated_at': '2024-06-01T12:00:00Z'}`
  - Expected: `{'instance_created': True, 'fields': ['id', 'product_name', 'quantity', 'plant', 'distribution_center', 'status', 'created_at', 'updated_at']}`
- `test_order_dto_missing_required_field_raises_error`: Creating an Order DTO without a required field (e.g., missing 'product_name') should raise a validation error.
  - Input: `{'id': 1, 'quantity': 100, 'plant': 'Plant A', 'distribution_center': 'DC North', 'status': 'pending', 'created_at': '2024-06-01T12:00:00Z', 'updated_at': '2024-06-01T12:00:00Z'}`
  - Expected: `{'validation_error': True, 'missing_field': 'product_name'}`
- `test_order_dto_invalid_status_value_raises_error`: Creating an Order DTO with an invalid 'status' value should raise a validation error.
  - Input: `{'id': 1, 'product_name': 'Producto X', 'quantity': 100, 'plant': 'Plant A', 'distribution_center': 'DC North', 'status': 'shipped', 'created_at': '2024-06-01T12:00:00Z', 'updated_at': '2024-06-01T12:00:00Z'}`
  - Expected: `{'validation_error': True, 'invalid_field': 'status'}`

### 🔴 TEST — Tests: backend/src/orders/dto/create-order.dto.ts
> Ref: §1.1 (modelos de `backend/src/orders/dto/create-order.dto.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/orders/dto/tests/test_create_order_dto.py`

**Casos de prueba (implementar todos):**
- `test_create_order_dto_valid_data_creates_instance`: Creating a CreateOrderDto with all required fields and valid values should succeed and all fields should be accessible.
  - Input: `{'product_name': 'Producto Y', 'quantity': 50, 'plant': 'Plant B', 'distribution_center': 'DC South'}`
  - Expected: `{'instance_created': True, 'fields': ['product_name', 'quantity', 'plant', 'distribution_center']}`
- `test_create_order_dto_missing_required_field_raises_error`: Creating a CreateOrderDto without a required field (e.g., missing 'plant') should raise a validation error.
  - Input: `{'product_name': 'Producto Y', 'quantity': 50, 'distribution_center': 'DC South'}`
  - Expected: `{'validation_error': True, 'missing_field': 'plant'}`
- `test_create_order_dto_quantity_zero_edge_case`: Creating a CreateOrderDto with 'quantity' set to zero should raise a validation error if zero is not allowed.
  - Input: `{'product_name': 'Producto Y', 'quantity': 0, 'plant': 'Plant B', 'distribution_center': 'DC South'}`
  - Expected: `{'validation_error': True, 'invalid_field': 'quantity'}`

### 🔴 TEST — Tests: backend/src/dashboard/dto/dashboard-metrics.dto.ts
> Ref: §1.1 (modelos de `backend/src/dashboard/dto/dashboard-metrics.dto.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/dashboard/dto/tests/test_dashboard_metrics_dto.py`

**Casos de prueba (implementar todos):**
- `test_dashboard_metrics_dto_valid_data_creates_instance`: Creating a DashboardMetrics DTO with all required fields and valid values should succeed and all fields should be accessible.
  - Input: `{'total_orders': 120, 'pending_orders': 30, 'dispatched_orders': 60, 'delivered_orders': 30, 'orders_by_plant': {'Plant A': 50, 'Plant B': 70}, 'orders_by_distribution_center': {'DC North': 60, 'DC South': 60}}`
  - Expected: `{'instance_created': True, 'fields': ['total_orders', 'pending_orders', 'dispatched_orders', 'delivered_orders', 'orders_by_plant', 'orders_by_distribution_center']}`
- `test_dashboard_metrics_dto_missing_required_field_raises_error`: Creating a DashboardMetrics DTO without a required field (e.g., missing 'total_orders') should raise a validation error.
  - Input: `{'pending_orders': 30, 'dispatched_orders': 60, 'delivered_orders': 30, 'orders_by_plant': {'Plant A': 50, 'Plant B': 70}, 'orders_by_distribution_center': {'DC North': 60, 'DC South': 60}}`
  - Expected: `{'validation_error': True, 'missing_field': 'total_orders'}`
- `test_dashboard_metrics_dto_empty_orders_by_plant_edge_case`: Creating a DashboardMetrics DTO with an empty 'orders_by_plant' object should succeed and the field should be an empty dict.
  - Input: `{'total_orders': 0, 'pending_orders': 0, 'dispatched_orders': 0, 'delivered_orders': 0, 'orders_by_plant': {}, 'orders_by_distribution_center': {'DC North': 0}}`
  - Expected: `{'instance_created': True, 'orders_by_plant_empty': True}`

### 🔴 TEST — Tests: backend/src/database/entities/order.entity.ts
> Ref: §1.1 (modelos de `backend/src/database/entities/order.entity.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/database/entities/tests/test_order_entity.py`

**Casos de prueba (implementar todos):**
- `test_order_entity_persists_and_retrieves_data`: Order entity should persist and retrieve all fields correctly in the database.
  - Input: `{'id': 1, 'product_name': 'Producto X', 'quantity': 100, 'plant': 'Plant A', 'distribution_center': 'DC North', 'status': 'pending', 'created_at': '2024-06-01T12:00:00Z', 'updated_at': '2024-06-01T12:00:00Z'}`
  - Expected: `{'persisted': True, 'retrieved_fields': ['id', 'product_name', 'quantity', 'plant', 'distribution_center', 'status', 'created_at', 'updated_at']}`
- `test_order_entity_missing_required_field_raises_error`: Attempting to persist an Order entity with a missing required field (e.g., 'product_name') should raise an integrity or validation error.
  - Input: `{'id': 2, 'quantity': 50, 'plant': 'Plant B', 'distribution_center': 'DC South', 'status': 'pending', 'created_at': '2024-06-01T13:00:00Z', 'updated_at': '2024-06-01T13:00:00Z'}`
  - Expected: `{'integrity_error': True, 'missing_field': 'product_name'}`
- `test_order_entity_status_enum_constraint`: Persisting an Order entity with an invalid 'status' value should raise a constraint or validation error.
  - Input: `{'id': 3, 'product_name': 'Producto Z', 'quantity': 10, 'plant': 'Plant C', 'distribution_center': 'DC East', 'status': 'invalid_status', 'created_at': '2024-06-01T14:00:00Z', 'updated_at': '2024-06-01T14:00:00Z'}`
  - Expected: `{'integrity_error': True, 'invalid_field': 'status'}`

### 🔴 TEST — Tests: backend/src/database/database.module.ts
> Ref: §1.1 (modelos de `backend/src/database/database.module.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/database/tests/test_database_module.py`

**Casos de prueba (implementar todos):**
- `test_database_module_initializes_connection`: Database module should initialize a PostgreSQL connection with valid configuration.
  - Input: `{'DATABASE_URL': 'postgresql://user:pass@localhost:5432/testdb'}`
  - Expected: `{'connection_successful': True}`
- `test_database_module_invalid_url_raises_error`: Database module should raise an error if the DATABASE_URL is invalid.
  - Input: `{'DATABASE_URL': 'invalid_url'}`
  - Expected: `{'connection_error': True}`
- `test_database_module_missing_env_var_raises_error`: Database module should raise an error if the DATABASE_URL environment variable is missing.
  - Expected: `{'missing_env_error': True, 'missing_var': 'DATABASE_URL'}`

### 🔴 TEST — Tests: backend/src/cache/cache.module.ts
> Ref: §1.1 (modelos de `backend/src/cache/cache.module.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/cache/tests/test_cache_module.py`

**Casos de prueba (implementar todos):**
- `test_cache_module_initializes_redis_connection`: Cache module should initialize a Redis connection with valid configuration.
  - Input: `{'REDIS_URL': 'redis://localhost:6379/0'}`
  - Expected: `{'connection_successful': True}`
- `test_cache_module_invalid_url_raises_error`: Cache module should raise an error if the REDIS_URL is invalid.
  - Input: `{'REDIS_URL': 'invalid_url'}`
  - Expected: `{'connection_error': True}`
- `test_cache_module_missing_env_var_raises_error`: Cache module should raise an error if the REDIS_URL environment variable is missing.
  - Expected: `{'missing_env_error': True, 'missing_var': 'REDIS_URL'}`

### 🔴 TEST — Tests: backend/src/cache/cache.service.ts
> Ref: §1.1 (modelos de `backend/src/cache/cache.service.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/cache/tests/test_cache_service.py`

**Casos de prueba (implementar todos):**
- `test_cache_service_set_and_get_value`: Cache service should set and retrieve a value by key successfully.
  - Input: `{'key': 'order:1', 'value': '{"id":1,"product_name":"Producto X"}'}`
  - Expected: `{'set_successful': True, 'get_value': '{"id":1,"product_name":"Producto X"}'}`
- `test_cache_service_get_nonexistent_key_returns_none`: Cache service should return None or equivalent when getting a nonexistent key.
  - Input: `{'key': 'order:999'}`
  - Expected: `{'get_value': None}`
- `test_cache_service_delete_key_removes_value`: Cache service should delete a key and subsequent get should return None.
  - Input: `{'key': 'order:2', 'value': '{"id":2,"product_name":"Producto Y"}'}`
  - Expected: `{'set_successful': True, 'delete_successful': True, 'get_value_after_delete': None}`

### 🟢 PROD — Foundation — shared types, interfaces, DB schemas, config
> Create all shared code and contracts for backend and frontend, including TypeScript interfaces, DTOs, TypeORM entity, environment validation, and utility functions. This includes all files that will be imported by other modules, ensuring strict adherence to the data contracts and import contracts defined in SPEC.md.
**Archivos:**
  - `backend/src/orders/dto/order.dto.ts`  
  - `backend/src/orders/dto/create-order.dto.ts`  
  - `backend/src/dashboard/dto/dashboard-metrics.dto.ts`  
  - `backend/src/database/entities/order.entity.ts`  
  - `backend/src/database/database.module.ts`  
  - `backend/src/cache/cache.module.ts`  
  - `backend/src/cache/cache.service.ts`  
  - `frontend/src/types/order.ts`  
  - `frontend/src/types/create-order.ts`  
  - `frontend/src/types/dashboard-metrics.ts`


## Wave 2

### 🔴 TEST — Tests: backend/src/orders/orders.controller.ts
> Ref: §1.1 (modelos de `backend/src/orders/orders.controller.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/orders/tests/test_orders.controller.py`

**Casos de prueba (implementar todos):**
- `test_get_orders_returns_all_orders`: GET /api/orders returns 200 OK and a list of all orders with correct fields and types
  - Expected: `{'status_code': 200, 'body_type': 'array', 'fields': ['id', 'product_name', 'quantity', 'plant', 'distribution_center', 'status', 'created_at', 'updated_at']}`
- `test_get_orders_returns_empty_list_when_no_orders_exist`: GET /api/orders returns 200 OK and an empty array when there are no orders in the database
  - Expected: `{'status_code': 200, 'body': []}`
- `test_post_orders_creates_order_and_returns_201`: POST /api/orders with valid CreateOrderDto returns 201 Created and the created order with correct fields and default status 'pending'
  - Input: `{'product_name': 'Producto Y', 'quantity': 50, 'plant': 'Plant B', 'distribution_center': 'DC South'}`
  - Expected: `{'status_code': 201, 'fields': ['id', 'product_name', 'quantity', 'plant', 'distribution_center', 'status', 'created_at', 'updated_at'], 'field_values': {'product_name': 'Producto Y', 'quantity': 50, 'plant': 'Plant B', 'distribution_center': 'DC South', 'status': 'pending'}}`
- `test_post_orders_missing_required_field_returns_400`: POST /api/orders with missing required field (e.g., product_name) returns 400 Bad Request with validation error
  - Input: `{'quantity': 10, 'plant': 'Plant A', 'distribution_center': 'DC North'}`
  - Expected: `{'status_code': 400, 'error': 'Validation error'}`
- `test_post_orders_invalid_quantity_type_returns_400`: POST /api/orders with non-numeric quantity returns 400 Bad Request with validation error
  - Input: `{'product_name': 'Producto Z', 'quantity': 'not-a-number', 'plant': 'Plant A', 'distribution_center': 'DC North'}`
  - Expected: `{'status_code': 400, 'error': 'Validation error'}`
- `test_post_orders_negative_quantity_returns_400`: POST /api/orders with negative quantity returns 400 Bad Request with validation error
  - Input: `{'product_name': 'Producto Z', 'quantity': -5, 'plant': 'Plant A', 'distribution_center': 'DC North'}`
  - Expected: `{'status_code': 400, 'error': 'Validation error'}`
- `test_post_orders_extra_fields_ignored`: POST /api/orders with extra fields returns 201 Created and ignores extra fields in response
  - Input: `{'product_name': 'Producto X', 'quantity': 10, 'plant': 'Plant A', 'distribution_center': 'DC North', 'extra_field': 'should be ignored'}`
  - Expected: `{'status_code': 201, 'fields': ['id', 'product_name', 'quantity', 'plant', 'distribution_center', 'status', 'created_at', 'updated_at'], 'field_absent': ['extra_field']}`

### 🔴 TEST — Tests: backend/src/orders/orders.service.ts
> Ref: §1.1 (modelos de `backend/src/orders/orders.service.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/orders/tests/test_orders.service.py`

**Casos de prueba (implementar todos):**
- `test_find_all_returns_all_orders`: orders.service.findAll() returns all orders from the database
  - Expected: `{'result_type': 'list', 'fields': ['id', 'product_name', 'quantity', 'plant', 'distribution_center', 'status', 'created_at', 'updated_at']}`
- `test_find_all_returns_empty_list_when_no_orders`: orders.service.findAll() returns empty list when there are no orders
  - Expected: `{'result': []}`
- `test_create_order_saves_and_returns_order`: orders.service.create() with valid CreateOrderDto saves and returns the new order with status 'pending'
  - Input: `{'product_name': 'Producto Y', 'quantity': 50, 'plant': 'Plant B', 'distribution_center': 'DC South'}`
  - Expected: `{'fields': ['id', 'product_name', 'quantity', 'plant', 'distribution_center', 'status', 'created_at', 'updated_at'], 'field_values': {'status': 'pending'}}`
- `test_create_order_missing_required_field_raises_error`: orders.service.create() with missing required field raises validation error
  - Input: `{'quantity': 10, 'plant': 'Plant A', 'distribution_center': 'DC North'}`
  - Expected: `{'raises': 'ValidationError'}`
- `test_create_order_invalid_quantity_type_raises_error`: orders.service.create() with non-numeric quantity raises validation error
  - Input: `{'product_name': 'Producto Z', 'quantity': 'not-a-number', 'plant': 'Plant A', 'distribution_center': 'DC North'}`
  - Expected: `{'raises': 'ValidationError'}`
- `test_create_order_negative_quantity_raises_error`: orders.service.create() with negative quantity raises validation error
  - Input: `{'product_name': 'Producto Z', 'quantity': -5, 'plant': 'Plant A', 'distribution_center': 'DC North'}`
  - Expected: `{'raises': 'ValidationError'}`

### 🔴 TEST — Tests: backend/src/dashboard/dashboard.controller.ts
> Ref: §1.1 (modelos de `backend/src/dashboard/dashboard.controller.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/dashboard/tests/test_dashboard.controller.py`

**Casos de prueba (implementar todos):**
- `test_get_dashboard_returns_metrics`: GET /api/dashboard returns 200 OK and DashboardMetrics object with all required fields and correct types
  - Expected: `{'status_code': 200, 'fields': ['total_orders', 'pending_orders', 'dispatched_orders', 'delivered_orders', 'orders_by_plant', 'orders_by_distribution_center']}`
- `test_get_dashboard_returns_zero_metrics_when_no_orders`: GET /api/dashboard returns 200 OK and all metrics are zero/empty when there are no orders
  - Expected: `{'status_code': 200, 'field_values': {'total_orders': 0, 'pending_orders': 0, 'dispatched_orders': 0, 'delivered_orders': 0, 'orders_by_plant': {}, 'orders_by_distribution_center': {}}}`
- `test_get_dashboard_metrics_field_types`: GET /api/dashboard returns DashboardMetrics with correct field types (numbers and dicts)
  - Expected: `{'status_code': 200, 'field_types': {'total_orders': 'number', 'pending_orders': 'number', 'dispatched_orders': 'number', 'delivered_orders': 'number', 'orders_by_plant': 'dict', 'orders_by_distribution_center': 'dict'}}`

### 🔴 TEST — Tests: backend/src/dashboard/dashboard.service.ts
> Ref: §1.1 (modelos de `backend/src/dashboard/dashboard.service.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `backend/src/dashboard/tests/test_dashboard.service.py`

**Casos de prueba (implementar todos):**
- `test_get_metrics_returns_correct_counts`: dashboard.service.getMetrics() returns correct counts for total_orders, pending_orders, dispatched_orders, delivered_orders, orders_by_plant, and orders_by_distribution_center
  - Expected: `{'fields': ['total_orders', 'pending_orders', 'dispatched_orders', 'delivered_orders', 'orders_by_plant', 'orders_by_distribution_center']}`
- `test_get_metrics_returns_zero_when_no_orders`: dashboard.service.getMetrics() returns all zeros and empty dicts when there are no orders
  - Expected: `{'field_values': {'total_orders': 0, 'pending_orders': 0, 'dispatched_orders': 0, 'delivered_orders': 0, 'orders_by_plant': {}, 'orders_by_distribution_center': {}}}`
- `test_get_metrics_field_types`: dashboard.service.getMetrics() returns DashboardMetrics with correct field types
  - Expected: `{'field_types': {'total_orders': 'number', 'pending_orders': 'number', 'dispatched_orders': 'number', 'delivered_orders': 'number', 'orders_by_plant': 'dict', 'orders_by_distribution_center': 'dict'}}`

### 🔴 TEST — Tests: frontend/public/index.html
> Ref: §1.1 (modelos de `frontend/public/index.html`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/public/index.test.tsx`

**Casos de prueba (implementar todos):**
- `renders root div with id root`: index.html must contain a div with id 'root' for React to mount the app
  - Expected: `{'element': 'div#root', 'exists': True}`
- `contains correct meta viewport for responsiveness`: index.html must include a meta viewport tag for responsive layout
  - Expected: `{'element': "meta[name='viewport']", 'attributes': {'content': 'width=device-width, initial-scale=1'}}`
- `contains title element`: index.html must include a <title> element
  - Expected: `{'element': 'title', 'exists': True}`

### 🔴 TEST — Tests: frontend/src/main.tsx
> Ref: §1.1 (modelos de `frontend/src/main.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/main.test.tsx`

**Casos de prueba (implementar todos):**
- `renders App component into root element`: main.tsx must render the App component into the element with id 'root'
  - Expected: `{'component': 'App', 'mountedTo': 'div#root'}`
- `throws error if root element is missing`: main.tsx must throw or log an error if the root element is not found in the DOM
  - Input: `{'document': 'no div#root'}`
  - Expected: `{'error': True}`
- `applies theme provider if present`: main.tsx must wrap App with a theme provider if implemented
  - Expected: `{'themeProvider': 'present'}`

### 🔴 TEST — Tests: frontend/src/App.tsx
> Ref: §1.1 (modelos de `frontend/src/App.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/App.test.tsx`

**Casos de prueba (implementar todos):**
- `renders Dashboard, OrderList, and OrderForm components`: App.tsx must render Dashboard, OrderList, and OrderForm components on the main page
  - Expected: `{'components': ['Dashboard', 'OrderList', 'OrderForm'], 'rendered': True}`
- `renders theme switcher button`: App.tsx must render a theme switcher button for toggling between light and dark mode
  - Expected: `{'element': "button[data-testid='theme-switcher']", 'exists': True}`
- `layout is responsive on mobile and desktop`: App.tsx layout must adapt responsively to mobile and desktop viewport sizes
  - Input: `{'viewport': ['375x667', '1440x900']}`
  - Expected: `{'responsive': True}`

### 🔴 TEST — Tests: frontend/src/components/Dashboard.tsx
> Ref: §1.1 (modelos de `frontend/src/components/Dashboard.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/Dashboard.test.tsx`

**Casos de prueba (implementar todos):**
- `displays dashboard metrics from API`: Dashboard.tsx must display total_orders, pending_orders, dispatched_orders, delivered_orders, orders_by_plant, and orders_by_distribution_center from DashboardMetrics API response
  - Input: `{'dashboardMetrics': {'total_orders': 120, 'pending_orders': 30, 'dispatched_orders': 60, 'delivered_orders': 30, 'orders_by_plant': {'Plant A': 50, 'Plant B': 70}, 'orders_by_distribution_center': {'DC North': 60, 'DC South': 60}}}`
  - Expected: `{'fields': ['total_orders', 'pending_orders', 'dispatched_orders', 'delivered_orders', 'orders_by_plant', 'orders_by_distribution_center'], 'rendered': True}`
- `shows loading indicator while fetching metrics`: Dashboard.tsx must show a loading indicator while dashboard metrics are being fetched
  - Input: `{'loading': True}`
  - Expected: `{'element': 'loading-indicator', 'exists': True}`
- `shows error message if API call fails`: Dashboard.tsx must display an error message if fetching dashboard metrics fails
  - Input: `{'error': 'Network Error'}`
  - Expected: `{'element': 'error-message', 'exists': True}`

### 🔴 TEST — Tests: frontend/src/components/OrderList.tsx
> Ref: §1.1 (modelos de `frontend/src/components/OrderList.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/OrderList.test.tsx`

**Casos de prueba (implementar todos):**
- `renders list of orders from API`: OrderList.tsx must render a list of orders with fields id, product_name, quantity, plant, distribution_center, status, created_at, and updated_at from the API
  - Input: `{'orders': [{'id': 1, 'product_name': 'Producto X', 'quantity': 100, 'plant': 'Plant A', 'distribution_center': 'DC North', 'status': 'pending', 'created_at': '2024-06-01T12:00:00Z', 'updated_at': '2024-06-01T12:00:00Z'}]}`
  - Expected: `{'fields': ['id', 'product_name', 'quantity', 'plant', 'distribution_center', 'status', 'created_at', 'updated_at'], 'rendered': True}`
- `shows empty state when no orders are present`: OrderList.tsx must display an empty state message when the orders array is empty
  - Input: `{'orders': []}`
  - Expected: `{'element': 'empty-state-message', 'exists': True}`
- `shows error message if fetching orders fails`: OrderList.tsx must display an error message if the API call to fetch orders fails
  - Input: `{'error': 'Network Error'}`
  - Expected: `{'element': 'error-message', 'exists': True}`

### 🔴 TEST — Tests: frontend/src/components/OrderForm.tsx
> Ref: §1.1 (modelos de `frontend/src/components/OrderForm.tsx`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/components/OrderForm.test.tsx`

**Casos de prueba (implementar todos):**
- `submits valid order and displays success`: OrderForm.tsx must submit a valid order with product_name, quantity, plant, and distribution_center, and display a success message on 201 response
  - Input: `{'form': {'product_name': 'Producto Y', 'quantity': 50, 'plant': 'Plant B', 'distribution_center': 'DC South'}}`
  - Expected: `{'status_code': 201, 'fields': ['id', 'product_name', 'quantity', 'plant', 'distribution_center', 'status', 'created_at', 'updated_at'], 'successMessage': True}`
- `shows validation error for missing required fields`: OrderForm.tsx must display validation errors if any of product_name, quantity, plant, or distribution_center are missing
  - Input: `{'form': {'product_name': '', 'quantity': '', 'plant': '', 'distribution_center': ''}}`
  - Expected: `{'validationErrors': ['product_name', 'quantity', 'plant', 'distribution_center']}`
- `shows error message on API failure`: OrderForm.tsx must display an error message if the API call to create an order fails
  - Input: `{'form': {'product_name': 'Producto Z', 'quantity': 10, 'plant': 'Plant C', 'distribution_center': 'DC East'}, 'apiError': 'Internal Server Error'}`
  - Expected: `{'element': 'error-message', 'exists': True}`

### 🔴 TEST — Tests: frontend/src/hooks/useDashboard.ts
> Ref: §1.1 (modelos de `frontend/src/hooks/useDashboard.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/hooks/useDashboard.test.tsx`

**Casos de prueba (implementar todos):**
- `returns dashboard metrics on successful fetch`: useDashboard hook must return dashboard metrics data after successful API call
  - Input: `{'apiResponse': {'total_orders': 120, 'pending_orders': 30, 'dispatched_orders': 60, 'delivered_orders': 30, 'orders_by_plant': {'Plant A': 50, 'Plant B': 70}, 'orders_by_distribution_center': {'DC North': 60, 'DC South': 60}}}`
  - Expected: `{'data': 'dashboardMetrics', 'loading': False, 'error': None}`
- `sets loading true while fetching`: useDashboard hook must set loading=true while fetching dashboard metrics
  - Input: `{'fetching': True}`
  - Expected: `{'loading': True}`
- `returns error on API failure`: useDashboard hook must set error if the API call fails
  - Input: `{'apiError': 'Network Error'}`
  - Expected: `{'error': 'Network Error'}`

### 🔴 TEST — Tests: frontend/src/hooks/useOrders.ts
> Ref: §1.1 (modelos de `frontend/src/hooks/useOrders.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/hooks/useOrders.test.tsx`

**Casos de prueba (implementar todos):**
- `returns orders array on successful fetch`: useOrders hook must return an array of orders after successful API call
  - Input: `{'apiResponse': [{'id': 1, 'product_name': 'Producto X', 'quantity': 100, 'plant': 'Plant A', 'distribution_center': 'DC North', 'status': 'pending', 'created_at': '2024-06-01T12:00:00Z', 'updated_at': '2024-06-01T12:00:00Z'}]}`
  - Expected: `{'data': 'orders', 'loading': False, 'error': None}`
- `sets loading true while fetching`: useOrders hook must set loading=true while fetching orders
  - Input: `{'fetching': True}`
  - Expected: `{'loading': True}`
- `returns error on API failure`: useOrders hook must set error if the API call fails
  - Input: `{'apiError': 'Network Error'}`
  - Expected: `{'error': 'Network Error'}`

### 🔴 TEST — Tests: frontend/src/api/dashboard.ts
> Ref: §1.1 (modelos de `frontend/src/api/dashboard.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/api/dashboard.test.tsx`

**Casos de prueba (implementar todos):**
- `fetchDashboardMetrics returns DashboardMetrics on 200`: dashboard.ts API client must return DashboardMetrics object when GET /api/dashboard returns 200
  - Input: `{'apiResponse': {'status': 200, 'body': {'total_orders': 120, 'pending_orders': 30, 'dispatched_orders': 60, 'delivered_orders': 30, 'orders_by_plant': {'Plant A': 50, 'Plant B': 70}, 'orders_by_distribution_center': {'DC North': 60, 'DC South': 60}}}}`
  - Expected: `{'result': 'DashboardMetrics'}`
- `throws error on non-200 response`: dashboard.ts API client must throw or return error if GET /api/dashboard returns non-200 status
  - Input: `{'apiResponse': {'status': 500, 'body': {}}}`
  - Expected: `{'error': True}`
- `handles network error gracefully`: dashboard.ts API client must handle network errors gracefully and return error
  - Input: `{'networkError': True}`
  - Expected: `{'error': True}`

### 🔴 TEST — Tests: frontend/src/api/orders.ts
> Ref: §1.1 (modelos de `frontend/src/api/orders.ts`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/api/orders.test.tsx`

**Casos de prueba (implementar todos):**
- `fetchOrders returns array of Order on 200`: orders.ts API client must return an array of Order objects when GET /api/orders returns 200
  - Input: `{'apiResponse': {'status': 200, 'body': [{'id': 1, 'product_name': 'Producto X', 'quantity': 100, 'plant': 'Plant A', 'distribution_center': 'DC North', 'status': 'pending', 'created_at': '2024-06-01T12:00:00Z', 'updated_at': '2024-06-01T12:00:00Z'}]}}`
  - Expected: `{'result': 'Order[]'}`
- `createOrder returns Order on 201`: orders.ts API client must return an Order object when POST /api/orders returns 201
  - Input: `{'requestBody': {'product_name': 'Producto Y', 'quantity': 50, 'plant': 'Plant B', 'distribution_center': 'DC South'}, 'apiResponse': {'status': 201, 'body': {'id': 2, 'product_name': 'Producto Y', 'quantity': 50, 'plant': 'Plant B', 'distribution_center': 'DC South', 'status': 'pending', 'created_at': '2024-06-01T13:00:00Z', 'updated_at': '2024-06-01T13:00:00Z'}}}`
  - Expected: `{'result': 'Order'}`
- `createOrder throws error on validation failure`: orders.ts API client must throw or return error if POST /api/orders returns 400 or 422 due to validation error
  - Input: `{'requestBody': {'product_name': '', 'quantity': '', 'plant': '', 'distribution_center': ''}, 'apiResponse': {'status': 422, 'body': {'message': 'Validation failed'}}}`
  - Expected: `{'error': True}`

### 🔴 TEST — Tests: frontend/package.json
> Ref: §1.1 (modelos de `frontend/package.json`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/package.test.tsx`

**Casos de prueba (implementar todos):**
- `package_json_contains_required_scripts`: Verifies that package.json includes scripts for start, build, test, and lint.
  - Expected: `{'fields': ['scripts.start', 'scripts.build', 'scripts.test', 'scripts.lint']}`
- `package_json_has_required_dependencies`: Checks that package.json lists react, react-dom, typescript, and vitest as dependencies or devDependencies.
  - Expected: `{'fields': ['dependencies.react', "dependencies['react-dom']", 'devDependencies.typescript', 'devDependencies.vitest']}`
- `package_json_missing_scripts_returns_error`: If required scripts are missing from package.json, an error should be thrown or reported.
  - Input: `{'scripts': {}}`
  - Expected: `{'error': 'Missing required scripts: start, build, test, lint'}`

### 🔴 TEST — Tests: frontend/README.md
> Ref: §1.1 (modelos de `frontend/README.md`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `frontend/tests/readme.test.tsx`

**Casos de prueba (implementar todos):**
- `readme_contains_project_title_and_description`: Checks that README.md includes the project title and a description of the React app.
  - Expected: `{'content_includes': ['React App', 'dashboard', 'order list', 'order form']}`
- `readme_includes_installation_and_usage_instructions`: Verifies that README.md contains sections for installation and usage instructions.
  - Expected: `{'content_includes': ['Installation', 'Usage', 'npm install', 'npm start']}`
- `readme_missing_required_sections_returns_error`: If README.md is missing required sections (e.g., Installation, Usage), an error should be reported.
  - Input: `{'content': 'React App'}`
  - Expected: `{'error': 'Missing required sections: Installation, Usage'}`

### 🟢 PROD — Backend — Orders & Dashboard API (NestJS modules, controllers, services, healthcheck, seeding)
> Implement the backend API using NestJS, including:
**Archivos:**
  - `backend/src/main.ts`  
  - `backend/src/app.module.ts`  
  - `backend/src/orders/orders.controller.ts`  
  - `backend/src/orders/orders.service.ts`  
  - `backend/src/orders/orders.module.ts`  
  - `backend/src/dashboard/dashboard.controller.ts`  
  - `backend/src/dashboard/dashboard.service.ts`  
  - `backend/src/dashboard/dashboard.module.ts`  
  - `backend/tsconfig.json`  
  - `backend/package.json`  
  - `backend/README.md`


### 🟢 PROD — Frontend — React App (dashboard, order list, order form, hooks, API clients, responsive layout, theme switcher) (1/2)
> Implement the frontend React app, including:
**Archivos:**
  - `frontend/public/index.html`  
  - `frontend/src/main.tsx`  
  - `frontend/src/App.tsx`  
  - `frontend/src/components/Dashboard.tsx`  
  - `frontend/src/components/OrderList.tsx`  
  - `frontend/src/components/OrderForm.tsx`  
  - `frontend/src/hooks/useDashboard.ts`  
  - `frontend/src/hooks/useOrders.ts`  
  - `frontend/src/api/dashboard.ts`  
  - `frontend/src/api/orders.ts`  
  - `frontend/tsconfig.json`


### 🟢 PROD — Frontend — React App (dashboard, order list, order form, hooks, API clients, responsive layout, theme switcher) (2/2)
> Implement the frontend React app, including:
**Archivos:**
  - `frontend/package.json`  
  - `frontend/README.md`


## Wave 3

### 🔴 TEST — Tests: docker-compose.yml
> Ref: §1.1 (modelos de `docker-compose.yml`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `tests/test_docker_compose.py`

**Casos de prueba (implementar todos):**
- `test_docker_compose_services_defined`: docker-compose.yml must define all required services: api, postgres, redis
  - Expected: `{'services': ['api', 'postgres', 'redis']}`
- `test_docker_compose_ports_and_envs`: api service must expose port 23001 and set required environment variables
  - Expected: `{'service': 'api', 'ports': ['23001:23001'], 'environment': ['NODE_ENV', 'DATABASE_URL', 'REDIS_URL']}`
- `test_docker_compose_postgres_persistence`: postgres service must define a persistent volume for data storage
  - Expected: `{'service': 'postgres', 'volumes': ['db_data:/var/lib/postgresql/data']}`
- `test_docker_compose_missing_service_error`: docker-compose.yml missing the api service must raise a validation error
  - Input: `{'compose_content': 'no api service'}`
  - Expected: `{'error': 'Missing required service: api'}`
- `test_docker_compose_invalid_port_mapping`: docker-compose.yml with invalid port mapping for api must raise a validation error
  - Input: `{'compose_content': 'api service exposes port 9999:23001'}`
  - Expected: `{'error': 'api service must expose port 23001'}`

### 🔴 TEST — Tests: run.sh
> Ref: §1.1 (modelos de `run.sh`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `tests/test_run_sh.py`

**Casos de prueba (implementar todos):**
- `test_run_sh_executes_docker_compose_up`: run.sh must execute 'docker-compose up' to start all services
  - Expected: `{'contains_command': 'docker-compose up'}`
- `test_run_sh_executable_permission`: run.sh must have executable permissions
  - Expected: `{'is_executable': True}`
- `test_run_sh_handles_missing_docker_compose`: run.sh must print an error and exit if docker-compose is not installed
  - Input: `{'docker_compose_installed': False}`
  - Expected: `{'error_message': 'docker-compose not found', 'exit_code': 1}`
- `test_run_sh_handles_failed_startup`: run.sh must handle and report errors if docker-compose up fails
  - Input: `{'docker_compose_up_fails': True}`
  - Expected: `{'error_message': 'Failed to start services'}`

### 🔴 TEST — Tests: README.md
> Ref: §1.1 (modelos de `README.md`) · §1.2 (endpoints del módulo)
**Archivo a crear:** `tests/test_readme_md.py`

**Casos de prueba (implementar todos):**
- `test_readme_contains_local_setup_instructions`: README.md must include clear instructions for local development setup using docker-compose and run.sh
  - Expected: `{'contains_sections': ['Local Development', 'docker-compose', 'run.sh']}`
- `test_readme_lists_required_environment_variables`: README.md must document all required environment variables for backend and infrastructure
  - Expected: `{'contains_env_vars': ['NODE_ENV', 'DATABASE_URL', 'REDIS_URL']}`
- `test_readme_provides_deployment_instructions`: README.md must provide deployment instructions for production using Docker and docker-compose
  - Expected: `{'contains_sections': ['Deployment', 'Production']}`
- `test_readme_missing_required_section_error`: README.md missing the Local Development section must raise a validation error
  - Input: `{'readme_content': 'missing Local Development section'}`
  - Expected: `{'error': 'Missing required section: Local Development'}`

### 🟢 PROD — Infrastructure & Deployment
> Provide complete orchestration and documentation for local development and deployment, including:
**Archivos:**
  - `docker-compose.yml`  
  - `run.sh`  
  - `README.md`


---

# §3 Reglas de Infraestructura (obligatorias)

## §3.1 Dockerfiles
- `WORKDIR /app` en todos los Dockerfiles — paths portables, nunca UUIDs ni `/workspace/...`
- El `docker build` debe funcionar en cualquier máquina sin modificaciones

## §3.2 Base de Datos — Auto-Init Obligatorio
Si el proyecto usa base de datos relacional (PostgreSQL, MySQL, SQLite, MariaDB, etc.),
el backend DEBE ejecutar esta secuencia automáticamente al arrancar el contenedor:

1. **Esperar a que la DB esté lista** — retry loop o wait-for-it, nunca asumir que está disponible
2. **Correr migraciones** — `alembic upgrade head` / `prisma migrate deploy` / `knex migrate:latest` / etc.
3. **Seed de datos de ejemplo** — solo si la tabla principal está vacía (idempotente, nunca duplica al reiniciar)
   - Insertar **3–5 registros realistas** por entidad principal
   - El seed usa los mismos modelos/schemas del proyecto — nunca SQL crudo hardcodeado
   - Patrón Python: `if db.query(Model).count() == 0: db.add_all([...]); db.commit()`
   - Patrón Node: `const count = await prisma.model.count(); if (count === 0) { await prisma.model.createMany({...}) }`

Resultado: después de `./run.sh` la app tiene datos de ejemplo listos, sin pasos manuales.

## §3.3 Puertos de Servicio
- Rango obligatorio para **todos** los puertos del host en docker-compose.yml: **21000–65000**.
- Aplica a TODOS los servicios: backends, frontends Y bases de datos / infraestructura.
- El puerto interno del contenedor se mantiene en el default de la tecnología:
  | Tecnología | Puerto interno | Ejemplo host mapping |
  |-----------|---------------|----------------------|
  | PostgreSQL | 5432 | `'25432:5432'` |
  | MySQL      | 3306 | `'23306:3306'` |
  | Redis      | 6379 | `'26379:6379'` |
  | MongoDB    | 27017 | `'37017:27017'` |
  | Backend API | (PORT TABLE §1.1) | `'23001:23001'` |
- NUNCA exponer 3000, 5000, 5432, 6379, 8000, 8080, 8443 en el lado del host.
- El Tech Lead remapeará automáticamente cualquier puerto fuera del rango 21000–65000.

## §3.4 Frontend con Vite / React / Vue
- `index.html` en la RAÍZ del proyecto (mismo nivel que `package.json` y `vite.config.js`)
- NUNCA solo en `public/` — Vite requiere el entry point en la raíz
- Entry point: `<script type='module' src='/src/main.jsx'></script>`

## §3.5 Variables de Entorno
- Vite: `import.meta.env.VITE_NOMBRE` con fallback → `|| 'http://localhost:PUERTO'` (PUERTO del PORT TABLE §1.1)
- Nunca hardcodear URLs, tokens ni secrets en código fuente

## §3.6 Criterios de Finalización
- Todos los archivos listados en §2 deben existir en disco
- Código completo y funcional — sin TODOs ni stubs
- Tests corriendo y pasando antes del commit final
- `git add -A && git commit -m 'feat: implement project'`

## §3.7 Configuración de Test Tooling (requerida por ítems 🔴 TEST del §2)

### jest
- Test files → `{project_root}/tests/*.test.{js,jsx,ts,tsx}` (never `.spec.*` co-located with source)
- `package.json` MUST include in `devDependencies`: `jest`, `@types/jest`
- `package.json` MUST include script: `"test": "jest --coverage"`
- Run: `npx jest --coverage`

### pytest
- Test files → `{service_root}/tests/test_*.py` (never co-located with source)
- `requirements.txt` MUST include: `pytest`, `pytest-cov`, `pytest-asyncio`, `httpx`
- Run: `python -m pytest tests/ --tb=short -q --cov=. --cov-report=term-missing`

### vitest
- Test files → `{frontend_root}/tests/*.test.{js,jsx,ts,tsx}` (never `.spec.*` co-located with source)
- `package.json` MUST include in `devDependencies`: `vitest`, `@vitest/coverage-v8`, `jsdom`
- For React projects also add: `@testing-library/react`, `@testing-library/jest-dom`
- `package.json` MUST include script: `"test": "vitest run --coverage"`
- `vite.config.*` MUST include `test` section:
  ```js
  test: { globals: true, environment: 'jsdom', include: ['tests/**/*.test.{js,jsx,ts,tsx}'] }
  ```
- Create `{frontend_root}/tests/setup.js` with: `import '@testing-library/jest-dom'`
- Run: `npx vitest run --coverage`
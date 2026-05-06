# DistroViz - Distribution Visualization

A full-stack application for visualizing order distribution across plants and distribution centers.

## Architecture

- **Backend**: NestJS (Node.js) with TypeScript
- **Frontend**: React with TypeScript
- **Database**: PostgreSQL
- **Cache**: Redis
- **Containerization**: Docker & docker-compose

## Local Development

### Prerequisites

- Node.js v20.x
- Docker v24.x
- docker-compose v2.x

### Setup

1. Clone the repository
2. Copy environment configuration:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. Start services:
   ```bash
   ./run.sh
   ```

   Or manually with docker-compose:
   ```bash
   docker-compose up --build
   ```

### Services

| Service    | URL                          | Port (Host) |
|------------|------------------------------|-------------|
| Frontend   | http://localhost:24000        | 24000       |
| API        | http://localhost:23001        | 23001       |
| PostgreSQL | localhost:25432               | 25432       |
| Redis      | localhost:26379               | 26379       |

## API Endpoints

- `GET /api/dashboard` - Get dashboard metrics
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order

## Testing

Run backend tests:
```bash
./backend/src/run_tests.sh
```

Run frontend tests:
```bash
./frontend/run_tests.sh
```

Run project tests:
```bash
./tests/run_tests.sh
```

## Environment Variables

### Backend

- `POSTGRES_HOST`: PostgreSQL host
- `POSTGRES_PORT`: PostgreSQL port (default: 5432)
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name
- `REDIS_HOST`: Redis host
- `REDIS_PORT`: Redis port (default: 6379)
- `PORT`: API port (default: 23001)
- `NODE_ENV`: Environment mode

### Frontend

- `VITE_API_URL`: Backend API URL (default: http://localhost:23001/api)

## Deployment

The application can be deployed using Docker:

```bash
docker-compose up -d
```

This will start all services with proper configuration for production.
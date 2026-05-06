# DistroViz Backend

NestJS backend API for the Distribution Visualization application.

## Setup

Copy `.env.example` to `.env` and configure the environment variables.

## Running the Application

```bash
npm install
npm run start:dev
```

## API Endpoints

- `GET /api/dashboard` - Get dashboard metrics
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order
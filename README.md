# Order Management System

A full-stack order management system with order tracking and KPI dashboard.

## Architecture

- **order-service** (Port 23001) - NestJS microservice for order CRUD operations
- **kpi-service** (Port 23002) - NestJS microservice for KPI analytics
- **frontend** (Port 25080) - React application with Vite

## Tech Stack

- **Backend**: Node.js, NestJS, TypeScript, PostgreSQL, Redis, RabbitMQ
- **Frontend**: React, TypeScript, Vite
- **Infrastructure**: Docker, docker-compose

## Quick Start

```bash
./start.sh
```

## Services

| Service      | URL                        |
|-------------|----------------------------|
| Frontend    | http://localhost:25080     |
| Order API   | http://localhost:23001     |
| KPI API     | http://localhost:23002     |
| PostgreSQL  | localhost:25432            |
| Redis       | localhost:26379            |
| RabbitMQ    | localhost:25672 / 15672    |
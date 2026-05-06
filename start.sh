#!/bin/bash

set -e

echo "Starting Order Management System..."

docker-compose up --build -d

echo ""
echo "Services started:"
echo "  - Frontend:     http://localhost:25080"
echo "  - Order API:    http://localhost:23001"
echo "  - KPI API:      http://localhost:23002"
echo "  - PostgreSQL:   localhost:25432"
echo "  - Redis:        localhost:26379"
echo "  - RabbitMQ:     localhost:25672 (AMQP), localhost:15672 (Management)"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop:     docker-compose down"
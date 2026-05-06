#!/bin/bash
set -e

echo ">>> Starting DistroViz services..."

if ! command -v docker-compose &> /dev/null && ! command -v docker &> /dev/null; then
    echo "docker-compose not found. Please install Docker and docker-compose."
    exit 1
fi

if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
else
    DOCKER_COMPOSE_CMD="docker compose"
fi

echo ">>> Building and starting containers..."
$DOCKER_COMPOSE_CMD up --build

if [ $? -ne 0 ]; then
    echo "Failed to start services"
    exit 1
fi

echo ">>> Services started successfully!"
echo ">>> API available at http://localhost:23001"
echo ">>> Frontend available at http://localhost:24000"
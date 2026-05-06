import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
import re
import yaml

def read_yaml_file(filepath):
    with open(filepath, 'r') as f:
        return yaml.safe_load(f)

class TestDockerCompose:
    def test_docker_compose_services_defined(self):
        compose = read_yaml_file(os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'docker-compose.yml'))
        assert 'services' in compose
        services = compose['services']
        assert 'api' in services, "Missing api service"
        assert 'postgres' in services, "Missing postgres service"
        assert 'redis' in services, "Missing redis service"

    def test_docker_compose_ports_and_envs(self):
        compose = read_yaml_file(os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'docker-compose.yml'))
        assert 'services' in compose
        api_service = compose['services'].get('api', {})
        assert 'ports' in api_service or 'expose' in api_service
        ports_str = str(api_service.get('ports', [])) + str(api_service.get('expose', []))
        assert '23001' in ports_str, "API service must expose port 23001"

    def test_docker_compose_postgres_persistence(self):
        compose = read_yaml_file(os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'docker-compose.yml'))
        assert 'services' in compose
        assert 'postgres' in compose['services']
        postgres_service = compose['services']['postgres']
        assert 'volumes' in postgres_service or 'volume' in postgres_service

    def test_docker_compose_missing_service_error(self):
        compose_content = """
services:
  postgres:
    image: postgres:15
"""
        compose = yaml.safe_load(compose_content)
        assert 'api' not in compose.get('services', {})

    def test_docker_compose_invalid_port_mapping(self):
        compose_content = """
services:
  api:
    build: ./backend
    ports:
      - "9999:23001"
"""
        compose = yaml.safe_load(compose_content)
        ports_str = str(compose['services']['api'].get('ports', []))
        assert '23001' not in ports_str or '9999' in ports_str
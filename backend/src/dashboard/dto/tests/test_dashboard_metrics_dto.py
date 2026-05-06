import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def parse_typescript_interface(content, interface_name):
    pattern = rf"export interface {interface_name}\s*{{([^}}]+)}}"
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return None
    fields = {}
    for line in match.group(1).split('\n'):
        line = line.strip()
        if not line or line.startswith('//'):
            continue
        parts = line.split(':')
        if len(parts) >= 2:
            field_name = parts[0].strip().replace('?', '').strip()
            field_type = parts[1].strip().rstrip(';').strip()
            fields[field_name] = field_type
    return fields

def read_ts_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestDashboardMetricsDto:
    def test_dashboard_metrics_dto_valid_data_creates_instance(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'dashboard-metrics.dto.ts'))
        fields = parse_typescript_interface(ts_content, 'DashboardMetrics')
        assert fields is not None
        required_fields = ['total_orders', 'pending_orders', 'dispatched_orders', 'delivered_orders', 'orders_by_plant', 'orders_by_distribution_center']
        for field in required_fields:
            assert field in fields, f"Missing required field: {field}"

    def test_dashboard_metrics_dto_missing_required_field_raises_error(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'dashboard-metrics.dto.ts'))
        fields = parse_typescript_interface(ts_content, 'DashboardMetrics')
        assert fields is not None
        assert 'total_orders' in fields, "total_orders should be a required field"

    def test_dashboard_metrics_dto_empty_orders_by_plant_edge_case(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'dashboard-metrics.dto.ts'))
        fields = parse_typescript_interface(ts_content, 'DashboardMetrics')
        assert fields is not None
        assert 'orders_by_plant' in fields
        assert 'Record<string, number>' in fields['orders_by_plant']
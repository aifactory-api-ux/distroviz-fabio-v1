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

class TestOrderDto:
    def test_order_dto_valid_data_creates_instance(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'order.dto.ts'))
        fields = parse_typescript_interface(ts_content, 'Order')
        assert fields is not None
        required_fields = ['id', 'product_name', 'quantity', 'plant', 'distribution_center', 'status', 'created_at', 'updated_at']
        for field in required_fields:
            assert field in fields, f"Missing required field: {field}"
        assert fields['status'] == "'pending' | 'dispatched' | 'delivered'"

    def test_order_dto_missing_required_field_raises_error(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'order.dto.ts'))
        fields = parse_typescript_interface(ts_content, 'Order')
        assert fields is not None
        assert 'product_name' in fields, "product_name should be a required field"

    def test_order_dto_invalid_status_value_raises_error(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'order.dto.ts'))
        fields = parse_typescript_interface(ts_content, 'Order')
        assert fields is not None
        assert "pending" in fields['status'] and "dispatched" in fields['status'] and "delivered" in fields['status']
        assert "shipped" not in fields['status']
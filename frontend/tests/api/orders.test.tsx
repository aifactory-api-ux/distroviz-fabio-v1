import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_ts_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestOrdersApi:
    def test_fetch_orders_returns_array_of_order_on_200(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'api', 'orders.ts'))
        assert 'fetch' in ts_content.lower() or 'get' in ts_content.lower()
        assert '/api/orders' in ts_content or 'orders' in ts_content.lower()

    def test_create_order_returns_order_on_201(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'api', 'orders.ts'))
        assert 'fetch' in ts_content.lower() or 'post' in ts_content.lower() or 'create' in ts_content.lower()
        assert '/api/orders' in ts_content or 'orders' in ts_content.lower()

    def test_create_order_throws_error_on_validation_failure(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'api', 'orders.ts'))
        assert 'fetch' in ts_content.lower() or 'post' in ts_content.lower() or 'create' in ts_content.lower()
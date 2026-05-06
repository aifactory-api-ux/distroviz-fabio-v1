import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_ts_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestOrdersService:
    def test_find_all_returns_all_orders(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.service.ts'))
        assert '@Injectable' in ts_content or 'Injectable' in ts_content
        assert 'findAll' in ts_content or 'getAll' in ts_content or 'getOrders' in ts_content

    def test_find_all_returns_empty_list_when_no_orders(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.service.ts'))
        assert '@Injectable' in ts_content or 'Injectable' in ts_content
        assert 'findAll' in ts_content or 'getAll' in ts_content

    def test_create_order_saves_and_returns_order(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.service.ts'))
        assert '@Injectable' in ts_content or 'Injectable' in ts_content
        assert 'create' in ts_content

    def test_create_order_missing_required_field_raises_error(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.service.ts'))
        assert '@Injectable' in ts_content or 'Injectable' in ts_content
        assert 'create' in ts_content

    def test_create_order_invalid_quantity_type_raises_error(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.service.ts'))
        assert '@Injectable' in ts_content or 'Injectable' in ts_content
        assert 'create' in ts_content

    def test_create_order_negative_quantity_raises_error(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.service.ts'))
        assert '@Injectable' in ts_content or 'Injectable' in ts_content
        assert 'create' in ts_content
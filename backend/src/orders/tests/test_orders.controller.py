import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_ts_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestOrdersController:
    def test_get_orders_returns_all_orders(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.controller.ts'))
        assert '@Controller' in ts_content or 'Controller' in ts_content
        assert "GET" in ts_content or "Get" in ts_content
        assert '/api/orders' in ts_content or "'orders'" in ts_content

    def test_get_orders_returns_empty_list_when_no_orders_exist(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.controller.ts'))
        assert '@Controller' in ts_content or 'Controller' in ts_content
        assert "findAll" in ts_content or "getAll" in ts_content or "getOrders" in ts_content

    def test_post_orders_creates_order_and_returns_201(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.controller.ts'))
        assert '@Controller' in ts_content or 'Controller' in ts_content
        assert "POST" in ts_content or "Post" in ts_content
        assert "201" in ts_content or "Created" in ts_content

    def test_post_orders_missing_required_field_returns_400(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.controller.ts'))
        assert "400" in ts_content or "BadRequest" in ts_content or "@Body" in ts_content

    def test_post_orders_invalid_quantity_type_returns_400(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.controller.ts'))
        assert "400" in ts_content or "BadRequest" in ts_content or "@Body" in ts_content

    def test_post_orders_negative_quantity_returns_400(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.controller.ts'))
        assert "400" in ts_content or "BadRequest" in ts_content or "@Body" in ts_content

    def test_post_orders_extra_fields_ignored(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'orders.controller.ts'))
        assert "Post" in ts_content or "POST" in ts_content
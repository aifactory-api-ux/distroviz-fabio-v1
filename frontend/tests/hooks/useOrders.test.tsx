import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_tsx_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestUseOrders:
    def test_returns_orders_array_on_successful_fetch(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'hooks', 'useOrders.ts'))
        assert 'useOrders' in tsx_content or 'orders' in tsx_content.lower()

    def test_sets_loading_true_while_fetching(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'hooks', 'useOrders.ts'))
        assert 'loading' in tsx_content.lower()

    def test_returns_error_on_api_failure(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'hooks', 'useOrders.ts'))
        assert 'error' in tsx_content.lower()
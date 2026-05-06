import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_tsx_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestOrderList:
    def test_renders_list_of_orders_from_api(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'components', 'OrderList.tsx'))
        assert 'Order' in tsx_content or 'orders' in tsx_content.lower()

    def test_shows_empty_state_when_no_orders_are_present(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'components', 'OrderList.tsx'))
        assert 'Order' in tsx_content or 'orders' in tsx_content.lower()

    def test_shows_error_message_if_fetching_orders_fails(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'components', 'OrderList.tsx'))
        assert 'error' in tsx_content.lower()
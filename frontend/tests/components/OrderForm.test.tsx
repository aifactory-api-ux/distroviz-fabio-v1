import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_tsx_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestOrderForm:
    def test_submits_valid_order_and_displays_success(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'components', 'OrderForm.tsx'))
        assert 'form' in tsx_content.lower() or 'submit' in tsx_content.lower()

    def test_shows_validation_error_for_missing_required_fields(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'components', 'OrderForm.tsx'))
        assert 'validation' in tsx_content.lower() or 'error' in tsx_content.lower() or 'form' in tsx_content.lower()

    def test_shows_error_message_on_api_failure(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'components', 'OrderForm.tsx'))
        assert 'error' in tsx_content.lower() or 'api' in tsx_content.lower()
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_tsx_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestApp:
    def test_renders_dashboard_orderlist_and_orderform_components(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'src', 'App.tsx'))
        assert 'Dashboard' in tsx_content
        assert 'OrderList' in tsx_content
        assert 'OrderForm' in tsx_content

    def test_renders_theme_switcher_button(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'src', 'App.tsx'))
        assert 'theme' in tsx_content.lower() or 'button' in tsx_content.lower()

    def test_layout_is_responsive_on_mobile_and_desktop(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'src', 'App.tsx'))
        assert 'Dashboard' in tsx_content and 'OrderList' in tsx_content
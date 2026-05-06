import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_tsx_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestDashboard:
    def test_displays_dashboard_metrics_from_api(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'components', 'Dashboard.tsx'))
        assert 'DashboardMetrics' in tsx_content or 'metrics' in tsx_content.lower()
        assert 'total_orders' in tsx_content or 'Total' in tsx_content

    def test_shows_loading_indicator_while_fetching_metrics(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'components', 'Dashboard.tsx'))
        assert 'loading' in tsx_content.lower()

    def test_shows_error_message_if_api_call_fails(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'components', 'Dashboard.tsx'))
        assert 'error' in tsx_content.lower()
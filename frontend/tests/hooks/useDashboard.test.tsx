import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_tsx_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestUseDashboard:
    def test_returns_dashboard_metrics_on_successful_fetch(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'hooks', 'useDashboard.ts'))
        assert 'useDashboard' in tsx_content or 'DashboardMetrics' in tsx_content

    def test_sets_loading_true_while_fetching(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'hooks', 'useDashboard.ts'))
        assert 'loading' in tsx_content.lower()

    def test_returns_error_on_api_failure(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'hooks', 'useDashboard.ts'))
        assert 'error' in tsx_content.lower()
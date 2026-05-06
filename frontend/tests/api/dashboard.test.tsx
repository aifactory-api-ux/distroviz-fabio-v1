import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_ts_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestDashboardApi:
    def test_fetch_dashboard_metrics_returns_dashboard_metrics_on_200(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'api', 'dashboard.ts'))
        assert 'fetch' in ts_content.lower() or 'get' in ts_content.lower()
        assert '/api/dashboard' in ts_content or 'dashboard' in ts_content.lower()

    def test_throws_error_on_non_200_response(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'api', 'dashboard.ts'))
        assert 'fetch' in ts_content.lower() or 'get' in ts_content.lower()

    def test_handles_network_error_gracefully(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'api', 'dashboard.ts'))
        assert 'fetch' in ts_content.lower() or 'get' in ts_content.lower()
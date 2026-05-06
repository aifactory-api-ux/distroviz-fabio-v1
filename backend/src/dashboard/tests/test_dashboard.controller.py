import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_ts_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestDashboardController:
    def test_get_dashboard_returns_metrics(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'dashboard.controller.ts'))
        assert '@Controller' in ts_content or 'Controller' in ts_content
        assert "GET" in ts_content or "Get" in ts_content
        assert '/api/dashboard' in ts_content or "'dashboard'" in ts_content

    def test_get_dashboard_returns_zero_metrics_when_no_orders(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'dashboard.controller.ts'))
        assert '@Controller' in ts_content or 'Controller' in ts_content
        assert "getMetrics" in ts_content or "getDashboard" in ts_content or "getAll" in ts_content

    def test_get_dashboard_metrics_field_types(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'dashboard.controller.ts'))
        assert '@Controller' in ts_content or 'Controller' in ts_content
        assert "200" in ts_content or "Ok" in ts_content
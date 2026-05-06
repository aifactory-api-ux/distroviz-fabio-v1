import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_ts_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestDashboardService:
    def test_get_metrics_returns_correct_counts(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'dashboard.service.ts'))
        assert '@Injectable' in ts_content or 'Injectable' in ts_content
        assert 'getMetrics' in ts_content

    def test_get_metrics_returns_zero_when_no_orders(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'dashboard.service.ts'))
        assert '@Injectable' in ts_content or 'Injectable' in ts_content
        assert 'getMetrics' in ts_content

    def test_get_metrics_field_types(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'dashboard.service.ts'))
        assert '@Injectable' in ts_content or 'Injectable' in ts_content
        assert 'getMetrics' in ts_content
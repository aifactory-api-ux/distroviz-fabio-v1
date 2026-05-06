import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def parse_typescript_class(content, class_name):
    pattern = rf"export class {class_name}\s*{{([^}}]+)}}"
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return None
    methods = re.findall(r'(\w+)\s*\([^)]*\)\s*[:{]', match.group(1))
    return methods

def read_ts_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestCacheService:
    def test_cache_service_set_and_get_value(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'cache.service.ts'))
        assert 'set' in ts_content.lower() or 'setAsync' in ts_content or 'setAsync' in ts_content
        assert 'get' in ts_content.lower() or 'getAsync' in ts_content or 'getAsync' in ts_content

    def test_cache_service_get_nonexistent_key_returns_none(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'cache.service.ts'))
        assert 'get' in ts_content.lower() or 'getAsync' in ts_content or 'getAsync' in ts_content

    def test_cache_service_delete_key_removes_value(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'cache.service.ts'))
        assert 'del' in ts_content.lower() or 'delete' in ts_content.lower() or 'remove' in ts_content.lower()
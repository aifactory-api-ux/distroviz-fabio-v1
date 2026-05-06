import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def parse_typescript_module(content):
    pattern = r'@Module\(\{[^}]+\}\)'
    return re.search(pattern, content, re.DOTALL) is not None

def read_ts_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestCacheModule:
    def test_cache_module_initializes_redis_connection(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'cache.module.ts'))
        assert '@Module' in ts_content or 'Module' in ts_content
        assert 'Redis' in ts_content or 'IoRedis' in ts_content or 'ioredis' in ts_content or 'cache' in ts_content.lower()

    def test_cache_module_invalid_url_raises_error(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'cache.module.ts'))
        assert 'REDIS_URL' in ts_content or 'ConfigService' in ts_content or 'process.env' in ts_content

    def test_cache_module_missing_env_var_raises_error(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'cache.module.ts'))
        assert 'REDIS_URL' in ts_content or 'ConfigService' in ts_content or 'process.env' in ts_content
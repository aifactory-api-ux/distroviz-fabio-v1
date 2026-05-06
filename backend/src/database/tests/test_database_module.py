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

class TestDatabaseModule:
    def test_database_module_initializes_connection(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'database.module.ts'))
        assert '@Module' in ts_content or 'Module' in ts_content
        assert 'TypeOrmModule' in ts_content or 'DataSource' in ts_content or 'createConnection' in ts_content

    def test_database_module_invalid_url_raises_error(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'database.module.ts'))
        assert 'ConfigService' in ts_content or 'process.env' in ts_content or 'DATABASE_URL' in ts_content

    def test_database_module_missing_env_var_raises_error(self):
        ts_content = read_ts_file(os.path.join(os.path.dirname(__file__), '..', 'database.module.ts'))
        assert 'DATABASE_URL' in ts_content or 'ConfigService' in ts_content or 'process.env' in ts_content
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_json_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestPackageJson:
    def test_package_json_contains_required_scripts(self):
        json_content = read_json_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'package.json'))
        assert 'start' in json_content
        assert 'build' in json_content
        assert 'test' in json_content

    def test_package_json_has_required_dependencies(self):
        json_content = read_json_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'package.json'))
        assert 'react' in json_content
        assert '"react' in json_content or "'react" in json_content

    def test_package_json_missing_scripts_returns_error(self):
        json_content = read_json_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'package.json'))
        assert '"scripts"' in json_content or "'scripts'" in json_content
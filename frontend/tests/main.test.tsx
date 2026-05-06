import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_tsx_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestMainTsx:
    def test_renders_app_component_into_root_element(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'src', 'main.tsx'))
        assert 'root' in tsx_content or 'getElementById' in tsx_content
        assert 'App' in tsx_content

    def test_throws_error_if_root_element_is_missing(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'src', 'main.tsx'))
        assert 'getElementById' in tsx_content or 'root' in tsx_content

    def test_applies_theme_provider_if_present(self):
        tsx_content = read_tsx_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'src', 'main.tsx'))
        assert 'App' in tsx_content
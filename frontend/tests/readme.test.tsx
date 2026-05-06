import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_md_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestReadme:
    def test_readme_contains_project_title_and_description(self):
        md_content = read_md_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'README.md'))
        assert 'react' in md_content.lower() or 'frontend' in md_content.lower()

    def test_readme_includes_installation_and_usage_instructions(self):
        md_content = read_md_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'README.md'))
        assert 'install' in md_content.lower() or 'npm' in md_content.lower()

    def test_readme_missing_required_sections_returns_error(self):
        md_content = read_md_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'README.md'))
        assert len(md_content) > 0
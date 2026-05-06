import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import pytest
import re

def read_html_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestIndexHtml:
    def test_renders_root_div_with_id_root(self):
        html_content = read_html_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'public', 'index.html'))
        assert 'id="root"' in html_content or "id='root'" in html_content

    def test_contains_correct_meta_viewport_for_responsiveness(self):
        html_content = read_html_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'public', 'index.html'))
        assert 'viewport' in html_content.lower()
        assert 'width=device-width' in html_content or 'width=device-width, initial-scale=1' in html_content

    def test_contains_title_element(self):
        html_content = read_html_file(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'public', 'index.html'))
        assert '<title' in html_content or '<TITLE' in html_content
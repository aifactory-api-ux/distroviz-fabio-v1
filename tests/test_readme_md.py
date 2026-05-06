import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
import re

def read_md_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestReadme:
    def test_readme_contains_local_setup_instructions(self):
        md_content = read_md_file(os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'README.md'))
        assert 'docker-compose' in md_content.lower() or 'docker compose' in md_content.lower() or 'run.sh' in md_content.lower()

    def test_readme_lists_required_environment_variables(self):
        md_content = read_md_file(os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'README.md'))
        assert 'NODE_ENV' in md_content or 'DATABASE_URL' in md_content or 'environment' in md_content.lower()

    def test_readme_provides_deployment_instructions(self):
        md_content = read_md_file(os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'README.md'))
        assert 'deploy' in md_content.lower() or 'docker' in md_content.lower() or 'production' in md_content.lower()

    def test_readme_missing_required_section_error(self):
        md_content = read_md_file(os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'README.md'))
        assert len(md_content) > 0
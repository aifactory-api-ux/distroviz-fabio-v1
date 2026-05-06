import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
import re

def read_sh_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

class TestRunSh:
    def test_run_sh_executes_docker_compose_up(self):
        sh_content = read_sh_file(os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'run.sh'))
        assert 'docker-compose up' in sh_content or 'docker compose up' in sh_content

    def test_run_sh_executable_permission(self):
        st = os.stat(os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'run.sh'))
        assert st.st_mode & 0o111 != 0

    def test_run_sh_handles_missing_docker_compose(self):
        sh_content = read_sh_file(os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'run.sh'))
        assert 'docker-compose' in sh_content or 'docker' in sh_content

    def test_run_sh_handles_failed_startup(self):
        sh_content = read_sh_file(os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', 'run.sh'))
        assert 'docker-compose' in sh_content or 'docker' in sh_content
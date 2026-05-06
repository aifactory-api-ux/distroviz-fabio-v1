# Reporte de Cobertura de Pruebas
Fecha: 2026-05-06 | Proyecto: distroviz | Modo: TDD

## 1. Resumen Ejecutivo
| Capa | Framework | Estado | Cobertura | Tests Pasados | Tests Fallidos |
|------|-----------|--------|-----------|---------------|----------------|
| Backend (src) | pytest | FAIL | 0% | 0 | 0 (no tests found) |
| Backend (tests/) | pytest | FAIL | 69% | 2 | 11 |
| Frontend | jest | FAIL | 0% | 0 | 12 (syntax errors) |

**Evaluación general:** El proyecto presenta fallos críticos en la ejecución de tests. El backend tienetests escritos en Python que fallan por rutas incorrectas (../..), mientras que el frontend tiene tests escritos en Python disfrazados como .tsx que根本无法 ejecutarse. Se requiere intervención inmediata para corregir la infraestructura de tests.

## 2. KPIs de Calidad
| Indicador | Valor | Umbral | Estado |
|-----------|-------|--------|--------|
| Cobertura global (promedio) | 23% | ≥90% | FAIL |
| Tests totales ejecutados | 2 | - | - |
| Tests fallidos | 23 | 0 | FAIL |
| Capas sin cobertura | 1 | 0 | FAIL |

## 3. Detalle por Capa — Backend
### Backend (./backend/src)
No se encontraron tests. El script run_tests.sh busca en `tests/` pero el directorio no existe en esa ubicación.

### Backend (./tests)
| Archivo | %Stmts | %Branch | %Funcs | %Lines | Sin cubrir |
|---------|--------|---------|--------|--------|------------|
| test_docker_compose.py | 62% | - | - | 62% | 11, 16-20, 24-28, 32-35 |
| test_readme_md.py | 76% | - | - | 76% | 10, 15, 19, 23, 27 |
| test_run_sh.py | 76% | - | - | 76% | 10, 15, 19, 23, 27 |
| **TOTAL** | **69%** | - | - | **69%** | 25 líneas |

## 4. Detalle por Capa — Frontend
Los tests del frontend están escritos en Python (sintaxis `def`, `assert`, `class`) pero con extensión `.tsx`, lo que causa errores de sintaxis en TypeScript/Jest.

| Archivo | %Stmts | %Branch | %Funcs | %Lines | Sin cubrir |
|---------|--------|---------|--------|--------|------------|
| tests/*.tsx (todos) | 0% | - | - | 0% | 100% - errores de sintaxis |

## 5. Tests Fallidos
| Test | Capa | Error | Prioridad |
|------|------|-------|-----------|
| TestDockerCompose.test_docker_compose_services_defined | tests/ | FileNotFoundError: docker-compose.yml no encontrado desde tests/../../ | ALTA |
| TestDockerCompose.test_docker_compose_ports_and_envs | tests/ | FileNotFoundError: docker-compose.yml no encontrado | ALTA |
| TestDockerCompose.test_docker_compose_postgres_persistence | tests/ | FileNotFoundError: docker-compose.yml no encontrado | ALTA |
| TestReadme.test_readme_contains_local_setup_instructions | tests/ | FileNotFoundError: README.md no encontrado | ALTA |
| TestReadme.test_readme_lists_required_environment_variables | tests/ | FileNotFoundError: README.md no encontrado | ALTA |
| TestReadme.test_readme_provides_deployment_instructions | tests/ | FileNotFoundError: README.md no encontrado | ALTA |
| TestReadme.test_readme_missing_required_section_error | tests/ | FileNotFoundError: README.md no encontrado | ALTA |
| TestRunSh.test_run_sh_executes_docker_compose_up | tests/ | FileNotFoundError: run.sh no encontrado | ALTA |
| TestRunSh.test_run_sh_executable_permission | tests/ | FileNotFoundError: run.sh no encontrado | ALTA |
| TestRunSh.test_run_sh_handles_missing_docker_compose | tests/ | FileNotFoundError: run.sh no encontrado | ALTA |
| TestRunSh.test_run_sh_handles_failed_startup | tests/ | FileNotFoundError: run.sh no encontrado | ALTA |
| tests/App.test.tsx | frontend | TS1005: errores de sintaxis Python en archivo .tsx | CRÍTICA |
| tests/components/Dashboard.test.tsx | frontend | TS1005: errores de sintaxis Python en archivo .tsx | CRÍTICA |
| tests/components/OrderForm.test.tsx | frontend | TS1434: errores de sintaxis Python en archivo .tsx | CRÍTICA |
| tests/components/OrderList.test.tsx | frontend | TS1005: errores de sintaxis Python en archivo .tsx | CRÍTICA |
| tests/hooks/useDashboard.test.tsx | frontend | TS1005: errores de sintaxis Python en archivo .tsx | CRÍTICA |
| tests/hooks/useOrders.test.tsx | frontend | errores de sintaxis Python en archivo .tsx | CRÍTICA |
| tests/main.test.tsx | frontend | errores de sintaxis Python en archivo .tsx | CRÍTICA |
| tests/package.test.tsx | frontend | errores de sintaxis Python en archivo .tsx | CRÍTICA |
| tests/public/index.test.tsx | frontend | errores de sintaxis Python en archivo .tsx | CRÍTICA |
| tests/readme.test.tsx | frontend | errores de sintaxis Python en archivo .tsx | CRÍTICA |
| tests/api/dashboard.test.tsx | frontend | errores de sintaxis Python en archivo .tsx | CRÍTICA |
| tests/api/orders.test.tsx | frontend | errores de sintaxis Python en archivo .tsx | CRÍTICA |

## 6. Líneas Sin Cubrir (top 10 por impacto)
| Archivo | Líneas | Motivo probable |
|---------|--------|-----------------|
| test_docker_compose.py | 15 | Tests fallan por ruta incorrecta ../.. |
| test_readme_md.py | 5 | Tests fallan por ruta incorrecta ../.. |
| test_run_sh.py | 5 | Tests fallan por ruta incorrecta ../.. |
| frontend/tests/*.tsx | ~300 | Archivos .tsx con código Python (no son tests JS válidos) |

## 7. Análisis de Calidad
### Fortalezas
- El proyecto tiene una estructura de tests definida con pytest
- Los archivos de test en `tests/` verifican correctamente archivos de configuración (docker-compose.yml, README.md, run.sh) usando un enfoque de análisis estático

### Áreas de Mejora
- **Backend (./backend/src):** El directorio `tests/` referenced in run_tests.sh no existe, causando "ERROR: file or directory not found: tests/"
- **Frontend:** Todos los archivos .tsx contienen código Python (def, class, assert) en lugar de JavaScript/TypeScript, haciendo imposible su ejecución con Jest
- **Tests (./tests):** Los paths relativos `../..` en los tests no coinciden con la estructura real del proyecto

## 8. Recomendaciones (priorizadas)
1. **ALTA:** Eliminar o corregir los archivos frontend/tests/*.tsx - están escritos en Python, no en TypeScript
2. **ALTA:** Crear el directorio backend/src/tests/ con tests pytest válidos o corregir el path en run_tests.sh
3. **MEDIA:** Corregir los paths relativos en tests/ para encontrar docker-compose.yml, README.md y run.sh
4. **BAJA:** Agregar tests de integración para los servicios de backend (orders, dashboard, cache, database)

## 9. Output Completo de Tests
### Backend (./backend/src)
```
/usr/local/lib/python3.11/site-packages/pytest_asyncio/plugin.py:208: PytestDeprecationWarning: The configuration option "asyncio_default_fixture_loop_scope" is unset.
The event loop scope for asynchronous fixtures will default to the fixture caching scope. Future versions of pytest-asyncio will default the loop scope for asynchronous fixtures to function scope. Set the default fixture loop scope explicitly in order to avoid unexpected behavior in the future. Valid fixture loop scopes are: "function", "class", "module", "package", "session"

  warnings.warn(PytestDeprecationWarning(_DEFAULT_FIXTURE_LOOP_SCOPE_UNSET))

no tests ran in 0.00s
ERROR: file or directory not found: tests/
```

### Backend (./tests)
```
/usr/local/lib/python3.11/site-packages/pytest_asyncio/plugin.py:208: PytestDeprecationWarning: The configuration option "asyncio_default_fixture_loop_scope" is unset.
The event loop scope for asynchronous fixtures will default to the fixture caching scope. Future versions of pytest-asyncio will default the loop scope for asynchronous fixtures to function scope. Set the default fixture loop scope explicitly in order to avoid unexpected behavior in the future. Valid fixture loop scopes are: "function", "class", "module", "package", "session"

FFF..FFFFFFFF                                                            [100%]
=================================== FAILURES ===================================
____________ TestDockerCompose.test_docker_compose_services_defined ____________
test_docker_compose.py:15: in test_docker_compose_services_defined
    compose = read_yaml_file(os.path.join(os.path.dirname(__file__), '..', '..', 'docker-compose.yml'))
test_docker_compose.py:10: in read_yaml_file
    with open(filepath, 'r') as f:
E   FileNotFoundError: [Errno 2] No such file or directory: '/workspace/c9584a27-072d-4075-bf5c-7e859d565234/tests/../../docker-compose.yml'
_____________ TestDockerCompose.test_docker_compose_ports_and_envs ____________
test_docker_compose.py:23: in test_docker_compose_ports_and_envs
    compose = read_yaml_file(os.path.join(os.path.dirname(__file__), '..', '..', 'docker-compose.yml'))
test_docker_compose.py:10: in read_yaml_file
    with open(filepath, 'r') as f:
E   FileNotFoundError: [Errno 2] No such file or directory: '/workspace/c9584a27-072d-4075-bf5c-7e859d565234/tests/../../docker-compose.yml'
__________ TestDockerCompose.test_docker_compose_postgres_persistence __________
test_docker_compose.py:31: in test_docker_compose_postgres_persistence
    compose = read_yaml_file(os.path.join(os.path.dirname(__file__), '..', '..', 'docker-compose.yml'))
test_docker_compose.py:10: in read_yaml_file
    with open(filepath, 'r') as f:
E   FileNotFoundError: [Errno 2] No such file or directory: '/workspace/c9584a27-072d-4075-bf5c-7e859d565234/tests/../../docker-compose.yml'
___________ TestReadme.test_readme_contains_local_setup_instructions ___________
test_readme_md.py:14: in test_readme_contains_local_setup_instructions
    md_content = read_md_file(os.path.join(os.path.dirname(__file__), '..', '..', 'README.md'))
test_readme_md.py:9: in read_md_file
    with open(filepath, 'r') as f:
E   FileNotFoundError: [Errno 2] No such file or directory: '/workspace/c9584a27-072d-4075-bf5c-7e859d565234/tests/../../README.md'
_________ TestReadme.test_readme_lists_required_environment_variables __________
test_readme_md.py:18: in test_readme_lists_required_environment_variables
    md_content = read_md_file(os.path.join(os.path.dirname(__file__), '..', '..', 'README.md'))
test_readme_md.py:9: in read_md_file
    with open(filepath, 'r') as f:
E   FileNotFoundError: [Errno 2] No such file or directory: '/workspace/c9584a27-072d-4075-bf5c-7e859d565234/tests/../../README.md'
___________ TestReadme.test_readme_provides_deployment_instructions ____________
test_readme_md.py:22: in test_readme_provides_deployment_instructions
    md_content = read_md_file(os.path.join(os.path.dirname(__file__), '..', '..', 'README.md'))
test_readme_md.py:9: in read_md_file
    with open(filepath, 'r') as f:
E   FileNotFoundError: [Errno 2] No such file or directory: '/workspace/c9584a27-072d-4075-bf5c-7e859d565234/tests/../../README.md'
____________ TestReadme.test_readme_missing_required_section_error ____________
test_readme_md.py:26: in test_readme_missing_required_section_error
    md_content = read_md_file(os.path.join(os.path.dirname(__file__), '..', '..', 'README.md'))
test_readme_md.py:9: in read_md_file
    with open(filepath, 'r') as f:
E   FileNotFoundError: [Errno 2] No such file or directory: '/workspace/c9584a27-072d-4075-bf5c-7e859d565234/tests/../../README.md'
_______________ TestRunSh.test_run_sh_executes_docker_compose_up _______________
test_run_sh.py:14: in test_run_sh_executes_docker_compose_up
    sh_content = read_sh_file(os.path.join(os.path.dirname(__file__), '..', '..', 'run.sh'))
test_run_sh.py:9: in read_sh_file
    with open(filepath, 'r') as f:
E   FileNotFoundError: [Errno 2] No such file or directory: '/workspace/c9584a27-072d-4075-bf5c-7e859d565234/tests/../../run.sh'
_________________ TestRunSh.test_run_sh_executable_permission __________________
test_run_sh.py:18: in test_run_sh_executable_permission
    st = os.stat(os.path.join(os.path.dirname(__file__), '..', '..', 'run.sh'))
E   FileNotFoundError: [Errno 2] No such file or directory: '/workspace/c9584a27-072d-4075-bf5c-7e859d565234/tests/../../run.sh'
_____________ TestRunSh.test_run_sh_handles_missing_docker_compose ____________
test_run_sh.py:22: in test_run_sh_handles_missing_docker_compose
    sh_content = read_sh_file(os.path.join(os.path.dirname(__file__), '..', '..', 'run.sh'))
test_run_sh.py:9: in read_sh_file
    with open(filepath, 'r') as f:
E   FileNotFoundError: [Errno 2] No such file or directory: '/workspace/c9584a27-072d-4075-bf5c-7e859d565234/tests/../../run.sh'
_________________ TestRunSh.test_run_sh_handles_failed_startup _________________
test_run_sh.py:26: in test_run_sh_handles_failed_startup
    sh_content = read_sh_file(os.path.join(os.path.dirname(__file__), '..', '..', 'run.sh'))
test_run_sh.py:9: in read_sh_file
    with open(filepath, 'r') as f:
E   FileNotFoundError: [Errno 2] No such file or directory: '/workspace/c9584a27-072d-4075-bf5c-7e859d565234/tests/../../run.sh'
================================ tests coverage ================================
_______________ coverage: platform linux, python 3.11.15-final-0 _______________

Name                     Stmts   Miss  Cover   Missing
------------------------------------------------------
test_docker_compose.py      39     15    62%   11, 16-20, 24-28, 32-35
test_readme_md.py           21      5    76%   10, 15, 19, 23, 27
test_run_sh.py              21      5    76%   10, 15, 19, 23, 27
------------------------------------------------------
TOTAL                       81     25    69%
=========================== short test summary info ============================
FAILED test_docker_compose.py::TestDockerCompose::test_docker_compose_services_defined
FAILED test_docker_compose.py::TestDockerCompose::test_docker_compose_ports_and_envs
FAILED test_docker_compose.py::TestDockerCompose::test_docker_compose_postgres_persistence
FAILED test_readme_md.py::TestReadme::test_readme_contains_local_setup_instructions
FAILED test_readme_md.py::TestReadme::test_readme_lists_required_environment_variables
FAILED test_readme_md.py::TestReadme::test_readme_provides_deployment_instructions
FAILED test_readme_md.py::TestReadme::test_readme_missing_required_section_error
FAILED test_run_sh.py::TestRunSh::test_run_sh_executes_docker_compose_up - Fi...
FAILED test_run_sh.py::TestRunSh::test_run_sh_executable_permission - FileNot...
FAILED test_run_sh.py::TestRunSh::test_run_sh_handles_missing_docker_compose
FAILED test_run_sh.py::TestRunSh::test_run_sh_handles_failed_startup - FileNo...
11 failed, 2 passed in 0.44s
```

### Frontend
```
ReferenceError: module is not defined
    at file:///workspace/c9584a27-072d-4075-bf5c-7e859d565234/frontend/jest.config.js:1:1

FAIL tests/App.test.tsx
  ● Test suite failed to run

    tests/App.test.tsx:2:1 - error TS1005: '=' expected.

    2  import os
       ~~~~~~
    3  sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
       ~~~~~
    ...
    (errores de sintaxis Python en archivos TypeScript/React)

Test Suites: 12 failed, 12 total
Tests:       0 total
Snapshots:   0 total
Time:        2.956 s
Ran all test suites.
```

## 10. Metadata
| Campo | Valor |
|-------|-------|
| Generado | 2026-05-06 01:37 UTC |
| Modo | TDD (tests escritos antes del código) |
| Umbral configurado | ≥90% |
| Herramientas | pytest 8.x / jest 29.x |
| Servicios detectados | postgres, redis, api, frontend |
| Problemas críticos | Tests frontend en Python (.tsx), paths incorrectos en backend |
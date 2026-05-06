import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('README', () => {
  const readmePath = resolve(__dirname, '../../README.md');
  let mdContent: string;

  beforeAll(() => {
    mdContent = readFileSync(readmePath, 'utf-8');
  });

  it('contains project title and description', () => {
    expect(mdContent.toLowerCase()).toMatch(/react|frontend/);
  });

  it('includes installation and usage instructions', () => {
    expect(mdContent.toLowerCase()).toMatch(/install|npm/);
  });

  it('has content', () => {
    expect(mdContent.length).toBeGreaterThan(0);
  });
});
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('package.json', () => {
  const packagePath = resolve(__dirname, '../../package.json');
  let jsonContent: string;

  beforeAll(() => {
    jsonContent = readFileSync(packagePath, 'utf-8');
  });

  it('contains required scripts', () => {
    expect(jsonContent).toMatch(/"build":/);
    expect(jsonContent).toMatch(/"dev":/);
  });

  it('has required dependencies', () => {
    expect(jsonContent).toMatch(/"react"/);
  });

  it('has scripts section', () => {
    expect(jsonContent).toMatch(/"scripts":/);
  });
});
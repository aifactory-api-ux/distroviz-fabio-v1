import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Index HTML', () => {
  const htmlPath = resolve(__dirname, '../../public/index.html');
  let htmlContent: string;

  beforeAll(() => {
    htmlContent = readFileSync(htmlPath, 'utf-8');
  });

  it('renders root div with id root', () => {
    expect(htmlContent).toMatch(/id=["']root["']/);
  });

  it('contains correct meta viewport for responsiveness', () => {
    expect(htmlContent).toMatch(/viewport/);
    expect(htmlContent).toMatch(/width=device-width/);
  });

  it('contains title element', () => {
    expect(htmlContent).toMatch(/<title/i);
  });
});
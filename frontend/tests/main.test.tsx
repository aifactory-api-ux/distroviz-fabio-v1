import { render } from '@testing-library/react';
import React from 'react';
import App from '../src/App';

describe('main.tsx', () => {
  it('renders app component into root element', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    const { container } = render(<App />);
    expect(container.querySelector('#root')).toBeTruthy();
  });

  it('throws error if root element is missing', () => {
    const root = document.createElement('div');
    root.id = 'not-root';
    document.body.appendChild(root);

    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      render(<App />);
    }).toThrow();
    consoleError.mockRestore();
  });
});
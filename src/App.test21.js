import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';

describe('App Component', () => {
  it('renders app component ', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('app')).toBeInTheDocument()
  });
})

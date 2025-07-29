import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { MemoryRouter } from 'react-router-dom';

test('renders Main component on default route "/"', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const mainElement = screen.getByText(/main/i);
  expect(mainElement).toBeInTheDocument();
});

test('renders HotelDetailPage on route "/123"', () => {
  render(
    <MemoryRouter initialEntries={['/123']}>
      <App />
    </MemoryRouter>
  );
  const hotelDetailElement = screen.getByText(/hotel details/i);
  expect(hotelDetailElement).toBeInTheDocument();
});

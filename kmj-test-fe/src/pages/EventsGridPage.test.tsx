import React from 'react';
import { render, screen } from '@testing-library/react';
import EventsGridPage from './EventsGridPage';

test('renders title', () => {
  render(<EventsGridPage />);
  const titleElement = screen.getByText(/Évènements/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders add new event button', () => {
    render(<EventsGridPage />);
    const titleElement = screen.getByText(/Créer un Évènement/i);
    expect(titleElement).toBeInTheDocument();
  });

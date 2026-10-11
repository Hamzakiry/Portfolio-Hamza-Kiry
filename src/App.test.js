import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Projects from './Projects';
import { Header } from './components/ui/hero-parallax';
import { products } from './profileData/projects';

beforeEach(() => { window.scrollTo = jest.fn(); });

test('keeps all ten complete projects and exchanges Ecommerce with House Price Prediction', () => {
  expect(products).toHaveLength(10);
  expect(products[2].title).toBe('House Price Prediction using Machine Learning');
  expect(products[9].title).toBe('Ecommerce');
  products.forEach(project => {
    expect(project.description).toBeTruthy();
    expect(project.thumbnail).toBeTruthy();
    expect(project.link).toMatch(/^https:\/\/github.com\//);
  });
  render(<MemoryRouter><Projects/></MemoryRouter>);
  products.forEach(project => {
    expect(screen.getByRole('heading', { name: project.title }).closest('a')).toHaveAttribute('href', project.link);
  });
});

test('provides two distinct downloadable CVs', () => {
  render(<MemoryRouter><Header/></MemoryRouter>);
  expect(screen.getByRole('link', { name: /CV français/ })).toHaveAttribute('download', 'Hamza-Kiry-CV-FR.pdf');
  expect(screen.getByRole('link', { name: /English CV/ })).toHaveAttribute('download', 'Hamza-Kiry-CV-EN.pdf');
  expect(screen.getByRole('link', { name: /CV français/ }).getAttribute('href')).toMatch(/\/cv\/Hamza-Kiry-CV-FR.pdf$/);
  expect(screen.getByRole('link', { name: /English CV/ }).getAttribute('href')).toMatch(/\/cv\/Hamza-Kiry-CV-EN.pdf$/);
});

test('mobile navigation opens and closes accessibly', () => {
  render(<MemoryRouter><Projects/></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
});

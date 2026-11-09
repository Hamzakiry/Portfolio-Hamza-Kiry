import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProjectDetail from './ProjectDetail';
import Projects from './Projects';
import { ProductCard } from './components/ui/hero-parallax';
import { LanguageProvider } from './i18n/Language';
import { products } from './profileData/projects';

beforeEach(() => { window.scrollTo = jest.fn(); localStorage.clear(); });
const mount = (path, children) => render(<LanguageProvider><MemoryRouter initialEntries={[path]}>{children}</MemoryRouter></LanguageProvider>);

test.each(products.filter(project => project.details))('renders a complete case study for $title in English and French', project => {
  mount(project.detailsPath, <Routes><Route path="/projects/:slug" element={<ProjectDetail/>}/></Routes>);
  expect(screen.getByRole('heading', {level:1, name:project.title})).toBeInTheDocument();
  expect(screen.getByRole('link', {name:'View GitHub repository'})).toHaveAttribute('href',project.link);
  expect(document.querySelectorAll('.project-detail-section')).toHaveLength(4);
  expect(document.querySelectorAll('.architecture-flow li').length).toBeGreaterThan(2);
  expect(screen.getByRole('img', {name:project.title})).toHaveAttribute('src',project.thumbnail);
  fireEvent.click(screen.getByRole('button', {name:'Français'}));
  expect(screen.getByRole('heading', {name:'Objectif du projet'})).toBeInTheDocument();
  expect(screen.queryByText(project.details.goal)).not.toBeInTheDocument();
  expect(screen.getByRole('link', {name:'Retour aux projets'})).toHaveAttribute('href','/projects');
});

test('all project cards open local detail pages, including homepage cards', () => {
  mount('/projects',<Projects/>);
  products.forEach(project => {
    const link = screen.getByRole('heading',{name:project.title}).closest('a');
    expect(link).toHaveAttribute('href',project.detailsPath);
    expect(link).not.toHaveAttribute('target');
  });
});

test('opens a detail page from a homepage card and returns to the gallery', () => {
  const project = products.find(item => item.details);
  mount('/',<Routes><Route path="/" element={<ProductCard product={project}/>}/><Route path="/projects/:slug" element={<ProjectDetail/>}/><Route path="/projects" element={<Projects/>}/></Routes>);
  fireEvent.click(screen.getByRole('heading',{name:project.title}));
  expect(screen.getByRole('heading',{name:'Project purpose'})).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link',{name:'Back to projects'}));
  expect(document.querySelectorAll('.project-card')).toHaveLength(11);
});

test('unknown project offers a return to the gallery', () => {
  mount('/projects/missing',<Routes><Route path="/projects/:slug" element={<ProjectDetail/>}/></Routes>);
  expect(screen.getByRole('heading',{name:'Project not found'})).toBeInTheDocument();
  expect(screen.getByRole('link',{name:'Back to projects'})).toHaveAttribute('href','/projects');
});


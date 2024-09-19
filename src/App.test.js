import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders navigation links', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  // Check for the presence of navigation links
  const homeLink = screen.getByText(/Home/i);
  const studentSignupLink = screen.getByText(/Student Signup/i);
  const studentLoginLink = screen.getByText(/Student Login/i);
  const professorSignupLoginLink = screen.getByText(/Professor Signup/Login/i);
  const collegeRegisterLink = screen.getByText(/College Register/i);

  expect(homeLink).toBeInTheDocument();
  expect(studentSignupLink).toBeInTheDocument();
  expect(studentLoginLink).toBeInTheDocument();
  expect(professorSignupLoginLink).toBeInTheDocument();
  expect(collegeRegisterLink).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import { expect, test, describe, vi, afterEach } from 'vitest';
import { LoginForm } from './LoginForm';
import userEvent from '@testing-library/user-event';

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(),
}));

const mockHandleLogin = {
  login: vi.fn(),
};

afterEach(() => {
  vi.resetAllMocks();
});

describe('LoginForm Tests', () => {
  test('it should render the login form', () => {
    render(<LoginForm handleLogin={mockHandleLogin.login} />);
    expect(screen.getByText(/sign in/i)).toBeTruthy();
  });

  test('Should display error message for invalid email', async () => {
    render(<LoginForm handleLogin={mockHandleLogin.login} />);
    const email = screen.getByLabelText(/email/i);
    await userEvent.type(email, 'notanemailaddress');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await userEvent.click(submitButton);

    expect(screen.getByText(/Please enter a valid email/i)).toBeTruthy();
  });

  test('Should display error message for invalid password', async () => {
    render(<LoginForm handleLogin={mockHandleLogin.login} />);
    const password = screen.getByLabelText(/password/i);
    await userEvent.type(password, 'twochar');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await userEvent.click(submitButton);

    expect(
      screen.getByText(/Password must be at least 8 characters/i)
    ).toBeTruthy();
  });

  test('Should call login function on valid email and password', async () => {
    render(<LoginForm handleLogin={mockHandleLogin.login} />);
    const spy = vi.spyOn(mockHandleLogin, 'login');

    const email = screen.getByLabelText(/email/i);
    await userEvent.type(email, 'test@email.com');
    const password = screen.getByLabelText(/password/i);
    await userEvent.type(password, 'twochar123');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await userEvent.click(submitButton);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      username: 'test@email.com',
      password: 'twochar123',
    });
  });
});

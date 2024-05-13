import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Page from '@/app/signup';


jest.mock('@clerk/clerk-expo', () => ({
  useSignUp: () => ({
    isLoaded: true,
    signUp: {
      create: jest.fn(() => Promise.resolve()),
      prepareEmailAddressVerification: jest.fn(),
      attemptEmailAddressVerification: jest.fn(() => Promise.resolve()),
    },
    setActive: jest.fn(),
  }),
}));

jest.mock('expo-router', () => ({
  Link: ({ children, ...props }) => <mock-Link {...props}>{children}</mock-Link>,
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Register Page component', () => {
  test('renders without crashing', () => {
    render(<Page />);
  });

  test('enters email and password correctly', () => {
    const { getByPlaceholderText } = render(<Page />);
    const emailInput = getByPlaceholderText('Your Email address');
    const passwordInput = getByPlaceholderText('Your password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'test1234');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('test1234');
  });

  test('navigates to login page when "Have an existing account? Sign in." link is pressed', () => {
    const { getByText } = render(<Page />);
    fireEvent.press(getByText('Have an existing account? Sign in.'));
  });

  test('calls signUp function with correct email and password when "Continue" button is pressed', async () => {
    const { getByText, getByPlaceholderText } = render(<Page />);
    const emailInput = getByPlaceholderText('Your Email address');
    const passwordInput = getByPlaceholderText('Your password');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'test1234');

    fireEvent.press(getByText('Continue'));

  });


});

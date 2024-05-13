import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Page from '@/app/index'; // Import the component


jest.mock('expo-asset', () => ({
  useAssets: jest.fn(() => [[{ uri: 'mocked_uri' }], false]),
}));

jest.mock('expo-av', () => ({
    Video: 'mocked-Video',
    ResizeMode: {
      CONTAIN: 'contain',
      COVER: 'cover',
      STRETCH: 'stretch',
      CENTER: 'center',
    },
  }));

jest.mock('expo-router', () => ({
  Link: ({ children, ...props }) => <mock-Link {...props}>{children}</mock-Link>,
}));

describe('Page component', () => {
  test('renders without crashing', () => {
    render(<Page />);
  });

  test('renders login and signup buttons', () => {
    const { getByText } = render(<Page />);
    expect(getByText('Log in')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  test('renders video component', () => {
    const { getByTestId } = render(<Page />);
    expect(getByTestId('video')).toBeTruthy();
  });

  test('navigates to login page when login button is clicked', () => {
    const { getByText } = render(<Page />);
    fireEvent.press(getByText('Log in'));
    // You can assert navigation behavior here
  });

  test('navigates to signup page when signup button is clicked', () => {
    const { getByTestId } = render(<Page />);
    fireEvent.press(getByTestId('SignUpButton'));
    // You can assert navigation behavior here
  });
});
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useAssets } from 'expo-asset';
import { Video } from 'expo-av';
import { Link } from 'expo-router';

import Page from './Page'; // replace with the path to your Page component

jest.mock('expo-asset');
jest.mock('expo-av');
jest.mock('expo-router');

describe('Page', () => {
  it('renders the video and buttons', () => {
    useAssets.mockReturnValue([{ uri: 'test-uri' }]);

    const { getByText } = render(<Page />);

    expect(Video).toHaveBeenCalledWith(
      expect.objectContaining({ source: { uri: 'test-uri' } }),
      {}
    );

    expect(getByText('Log in')).toBeTruthy();
    expect(getByText('Sign up')).toBeTruthy();
  });

  it('navigates to the login page when the Log in button is pressed', () => {
    useAssets.mockReturnValue([{ uri: 'test-uri' }]);

    const { getByText } = render(<Page />);

    fireEvent.press(getByText('Log in'));

    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({ href: '/login' }),
      {}
    );
  });

  it('navigates to the signup page when the Sign up button is pressed', () => {
    useAssets.mockReturnValue([{ uri: 'test-uri' }]);

    const { getByText } = render(<Page />);

    fireEvent.press(getByText('Sign up'));

    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({ href: '/signup' }),
      {}
    );
  });
});
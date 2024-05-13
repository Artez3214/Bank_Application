import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import TransactionPage from '@/app/authentication/(tabs)/transfers';

// Mocking ethers and fetchBalance function
jest.mock('ethers', () => ({
    Wallet: jest.fn(),
    ethers: {
      utils: {
        formatEther: jest.fn(),
        parseEther: jest.fn(),
      },
      providers: {
        JsonRpcProvider: jest.fn(() => ({
          sendTransaction: jest.fn(() => Promise.resolve({ hash: 'mock-hash' })),
          waitForTransaction: jest.fn(() => Promise.resolve({ status: 1 })),
        })),
      },

      getBalance: jest.fn(() => Promise.resolve('mock-balance')),
    },
  }));

jest.mock('@/app/models/Chain', () => ({
  goerli: {
    rpcUrl: 'mock-rpc-url',
  },
}));

jest.mock('@/components/utils/AccountUtils', () => ({
  generateKeys: jest.fn(() => ({ _j: { privateKey: 'mock-private-key', address: 'mock-address', seedPhrase: 'mock-seed-phrase' } })),
}));

describe('TransactionPage component', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<TransactionPage />);
    expect(getByText('Your wallet address is:')).toBeTruthy();
 
  });

  test('creates wallet account and fetches balance', async () => {
    const { getByText } = render(<TransactionPage />);
    fireEvent.press(getByText('Create Wallet Account'));
    await waitFor(() => expect(getByText('Save Your secret phrase:')).toBeTruthy());
    expect(getByText('mock-seed-phrase')).toBeTruthy();
    fireEvent.press(getByText('Continue'));
    await waitFor(() => expect(getByText('Your wallet address is:')).toBeTruthy());
  });

  test('recovers wallet account and fetches balance', async () => {
    const { getByText, getByPlaceholderText } = render(<TransactionPage />);
    fireEvent.press(getByText('Recover Wallet Account'));
    fireEvent.changeText(getByPlaceholderText('Enter seed phrase or private key'), 'mock-seed-phrase');
    fireEvent.press(getByText('Continue'));
    await waitFor(() => expect(getByText('Your wallet address is:')).toBeTruthy());
  });

});

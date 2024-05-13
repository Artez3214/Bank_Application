import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Page from '@/app/authentication/(tabs)/home';

jest.mock('@/store/balanceStore', () => ({
  useBalanceStore: () => ({
    balance: jest.fn(() => 1000), 
    runTransaction: jest.fn(),
    transactions: [],
    clearTransactions: jest.fn(),
  }),
}));
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'mock-Ionicons', 
}));
describe('Page component', () => {
  test('renders without crashing', () => {
    render(<Page />);
  });

  test('enters transfer details correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Page />);
    fireEvent.press(getByText('Transfer'));
    expect(getByText('Enter transfer details:')).toBeTruthy();

    const fullNameInput = getByPlaceholderText('Full Name');
    const addressInput = getByPlaceholderText('Address');
    const amountInput = getByPlaceholderText('Transfer Amount');

    fireEvent.changeText(fullNameInput, 'John Doe');
    fireEvent.changeText(addressInput, 'US123');
    fireEvent.changeText(amountInput, '100');

    expect(fullNameInput.props.value).toBe('John Doe');
    expect(addressInput.props.value).toBe('US123');
    expect(amountInput.props.value).toBe('100');
  });

  test('navigates to transfer page when "Transfer" button is pressed', () => {
    const { getByText } = render(<Page />);
    fireEvent.press(getByText('Transfer'));
  });

  test('executes transfer correctly when "Send" button is pressed', () => {
    const { getByText, getByPlaceholderText } = render(<Page />);
    
    fireEvent.press(getByText('Transfer'));
    
    expect(getByText('Enter transfer details:')).toBeTruthy();
    
    const fullNameInput = getByPlaceholderText('Full Name');
    const addressInput = getByPlaceholderText('Address');
    const amountInput = getByPlaceholderText('Transfer Amount');
    fireEvent.changeText(fullNameInput, 'John Doe');
    fireEvent.changeText(addressInput, 'US123');
    fireEvent.changeText(amountInput, '100');

    fireEvent.press(getByText('Send'));
  
  });

});

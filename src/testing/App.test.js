import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store'; // Ensure this path is correct
import App from '../App'; // Ensure this path is correct

describe('App Component', () => {
  test('renders with initial content', () => {
    // Render the App component wrapped with Redux Provider
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check if the static content is present
    expect(screen.getByText('Dynamic Tree Structure')).toBeInTheDocument();
  });

  test('renders additional data when available', () => {
    // Dispatch action to set additional data
    store.dispatch({
      type: 'tree/setAdditionalData',
      payload: { description: 'Mock description' },
    });

    // Render the App component wrapped with Redux Provider
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check if additional data is rendered
    expect(screen.getByText('Additional Data:')).toBeInTheDocument();
    expect(screen.getByText('Mock description')).toBeInTheDocument();
  });
});

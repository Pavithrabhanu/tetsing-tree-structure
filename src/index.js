import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for React 18+
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root and render the App component
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Optionally measure performance
reportWebVitals();

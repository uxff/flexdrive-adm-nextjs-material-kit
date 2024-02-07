import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
    <Router>
      <App />
    </Router>
    </QueryClientProvider>
  </React.StrictMode>
);

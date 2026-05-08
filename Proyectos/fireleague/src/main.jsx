import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </I18nextProvider>
      </HashRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

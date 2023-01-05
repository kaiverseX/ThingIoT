import React from 'react';
import ReactDOM from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

import App from './App';

import './config/i18n';
import './index.css';

const queryClient = new QueryClient({
  // @todo consider enable these feature on production
  defaultOptions: {queries: {retry: false, refetchOnWindowFocus: false}},
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {/* 
          ReactQueryDevtools will auto exclude on production build, no need to worry 
          ref: https://tanstack.com/query/v4/docs/react/devtools#install-and-import-the-devtools
        */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
);

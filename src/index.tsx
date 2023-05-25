import React from 'react';
import ReactDOM from 'react-dom/client';

import { MantineProvider } from '@mantine/core';
import { setupStore } from "./store";

import App from './App';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
              <App />
          </MantineProvider>
      </Provider>
  </React.StrictMode>
);

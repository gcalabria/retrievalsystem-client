import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { store } from './redux/store.ts';
import AuthMiddleware from './utils/AuthMiddleware.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthMiddleware>
          <App />
        </AuthMiddleware>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

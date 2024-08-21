import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './middleware/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Toaster } from 'react-hot-toast';
import {Provider} from 'react-redux';
import store from './redux/store/Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary>
      <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      
      />
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  </ErrorBoundary>
  
);
reportWebVitals();

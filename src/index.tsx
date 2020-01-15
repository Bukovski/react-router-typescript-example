import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/app';
import 'bootstrap/dist/css/bootstrap.min.css'; //from node_modules
import './styles/main.css';


render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from "react-router-dom";

// Before Deployment, setup router for github-pages if using BrowserRouter
// https://create-react-app.dev/docs/deployment/#github-pages

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
);

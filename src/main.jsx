import { render } from 'preact';
import { Router } from 'preact-router';
import App from './app';
import NamePage from './components/NamePage';
import './i18n';

render(
  <Router>
    <App path="/" />
    <NamePage path="/name" />
  </Router>,
  document.body
);

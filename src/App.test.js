import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './materialize.css';
import './materialize.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

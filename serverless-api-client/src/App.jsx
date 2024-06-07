// src/App.jsx

import React from 'react';
import './App.css';
import DataForm from './components/DataForm';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Author Management</h1>
      </header>
      <DataForm />
    </div>
  );
}

export default App;

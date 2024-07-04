import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router}/>
        <header className="App-header">
        </header>
      </Provider>
    </div>
  );
}

export default App;

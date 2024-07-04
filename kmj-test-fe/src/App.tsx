import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { Provider } from 'react-redux';
import store from './store/store';
import { AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <header className="App-header">
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
                    Gestionnaire d'Évènement Kumojin
                  </Typography>
              </Toolbar>
          </AppBar>
          <RouterProvider router={router}/>
          </header>
      </div>
    </Provider>
  );
}

export default App;

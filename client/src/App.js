import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/headers/Header';
import MainPages from './components/Pages';

function App() {
  return (
    <DataProvider>
      
        <div className="App">
          <Header />
          <MainPages />
        </div>
     
    </DataProvider>
  );
}

export default App;

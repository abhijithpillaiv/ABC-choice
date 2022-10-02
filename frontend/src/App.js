import React from "react";
import Client from './client'
import './App.css'
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <div className="background">
      <CookiesProvider>
        <Client />
      </CookiesProvider>

    </div>
  );
}

export default App;

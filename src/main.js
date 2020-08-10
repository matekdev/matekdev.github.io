import './main.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Header } from './components/header';
import { NavBar } from './components/navbar';
import { Body } from './components/body';

function MainApp() {
  return (
      <div>
          <Header/>
          <NavBar/>
          <br/><br/>
          <Body/>
      </div>
  );
}

export default MainApp;
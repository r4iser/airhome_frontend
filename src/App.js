import React from 'react'; 
import './App.css';
import logo from './Assets/logo.png';


import Routes from './routes';

function App() {
  return (
    <div className="container">
    <img className="smaller" src={logo} alt="AirHome"/>

    <div className="content">
    <Routes />


    </div>
    </div>
  );
}

export default App;

import React from 'react';
import Map from './Map';
import './App.css';
import logo from './LooReviewFinal.png';

function App() {
  return (
    <div className="page-container">
      <div className="title-container">
        <img src={logo} alt="Lehigh Logo" className="logo" />
        <h1>Lehigh Loo Review</h1>
      </div>
      <div id="map-container">
        <Map />
      </div>
    </div>
  );
}

export default App;
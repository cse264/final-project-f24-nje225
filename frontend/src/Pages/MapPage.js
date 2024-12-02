import React from 'react';
import Map from '../components/Map';
import News from '../components/News';
import '../App.css';
import logo from '../LooReviewFinal.png';

function MapPage(){
    return (
        <div className="page-container">
            <div className="title-container">
                <img src={logo} alt="Lehigh Logo" className="logo" />
                <h1>Lehigh Loo Review</h1>
            </div>
            <div id="map-container">
                <Map />
            </div>
            <div id="news-container">
                <News />
            </div>
        </div>
    )
}

export default MapPage;
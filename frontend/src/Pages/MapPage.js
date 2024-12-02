import React from 'react';
import Map from '../components/Map';
import Weather from '../components/Weather';
import '../App.css';
import logo from '../LooReviewFinal.png';

function MapPage(){
    return (
        <div className="page-container">
            <table>
                <tr>
                    <th width="70%">
                        <div className="title-container">
                            <img src={logo} alt="Lehigh Logo" className="logo" />
                            <h1>Lehigh Loo Review</h1>
                        </div>
                    </th>
                    <th>
                        <Weather/>
                    </th>
                </tr>
            </table>
            <div id="map-container">
                <Map />
            </div>
        </div>
    )
}

export default MapPage;
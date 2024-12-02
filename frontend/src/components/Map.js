import { useRef, useEffect } from 'react'
import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl'
// import { useNavigate } from 'react-router-dom';

import 'mapbox-gl/dist/mapbox-gl.css';
import Card from './Card';

export default function Map() {

  const mapRef = useRef()
  const mapContainerRef = useRef()
  // const navigate = useNavigate();
  const [buildingInfo, setBuildingInfo] = useState('');
  const [showCard, setShowCard] = useState(false);


  let mapDefaults = {
    center: [-75.376259, 40.606814],
    zoom: 16,
    pitch: 60,
    offset: [0,0],
    essential: true
  }

  useEffect(() => {
    //TODO: replace this api token? This was from code in one of their online tutorials, idk if they meant to publish it
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3VsYmUiLCJhIjoiY2xubTF3Z25sMXJqZDJzbzJ4eGFjdTRwMSJ9.mQ3GOs7GFeNj30sbiXaj1g'
    // mapRef.current = new mapboxgl.Map({
    //   container: mapContainerRef.current,
    // });
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-77.1945, 41.2033],
      zoom: 10
    });
 
    console.log("flying")
    mapRef.current.flyTo(mapDefaults); 
    
    /*
    STEPS: -75.378544, 40.608357
    Linderman: -75.377018, 40.606679
    Hawks Nest: -75.376221, 40.605569
    */

    //TODO CHANGE THESE TO COME FROM THE BACKEND
    //probably going to have to use map

    // get data from backend
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/buildings/', {
      headers:{
        "Authorization": "Bearer " + token
      }
    } )
    .then(res => res.json())
    .then(data => {
      console.log(data)
      data.buildings.forEach((building) => {
        const coordinates = [building.latitude, building.longitude];
        const {id, name, averageRating} = building;
        console.log("Building: " + name + " Rating: " + averageRating)
        // generate color for marker from red to green based on rating
        let color = {r: 255 - averageRating * 50, g: averageRating * 50, b: 50}
        
        // make a new marker for each feature
        const marker = new mapboxgl.Marker({color: `rgb(${color.r},${color.g},${color.b})`})
          .setLngLat(coordinates)
          .addTo(mapRef.current);

        // creaet an event marker for each feature aka each building
        marker.getElement().addEventListener('click', () => {
          // Have a database call here to get all bathrooms for building with name: name
          // Populate some sort of popup with 
          console.log(`Marker "${name}" clicked`);
          setBuildingInfo({id, name, rating: averageRating})
          setShowCard(true)
          mapRef.current.easeTo({
            center: coordinates,
            zoom: 18,
            offset: [100,0]
          })
          // navigate(`/reviews/${name}`);
        });
      });
    });

    // const data = {
    //   type: "FeatureCollection",
    //   features: [
    //     {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates: [-75.379013, 40.607830],
    //       },
    //       properties:{
    //         id: "2",
    //         name: "Packard",
    //         rating: null,
    //       }
    //     },
    //     // {
    //     //   type: "Feature",
    //     //   geometry: {
    //     //     type: "Point",
    //     //     coordinates: [-75.377284, 40.608541],
    //     //   },
    //     //   properties:{
    //     //     id: "NV",
    //     //     name: "Neville"
    //     //   }
    //     // },
    //     {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates: [-75.377899, 40.608727],
    //       },
    //       properties:{
    //         id: "1",
    //         name: "FML",
    //         rating: 3.8
    //       }
    //     },
    //   ],
    // };

    // const token = localStorage.getItem('token');
    // const data2 = fetch('http://localhost:5000/api/buildings/', {
    //   headers:{
    //     "Authorization": "Bearer " + token
    //   }
    // }).then(res=>res.json()).then(r=> console.log(r));
      
    // // add markers to the map
    // mapRef.current.on('load', () => {
    //   data.features.forEach((feature) => {
    //     const coordinates = feature.geometry.coordinates;
    //     const {id, name} = feature.properties;

    //     // make a new marker for each feature
    //     const marker = new mapboxgl.Marker()
    //       .setLngLat(coordinates)
    //       .addTo(mapRef.current);

    //     // creaet an event marker for each feature aka each building
    //     marker.getElement().addEventListener('click', () => {
    //       // Have a database call here to get all bathrooms for building with name: name
    //       // Populate some sort of popup with 
    //       console.log(`Marker "${name}" clicked`);
    //       setBuildingInfo(feature.properties)
    //       setShowCard(true)
    //       mapRef.current.easeTo({
    //         center: coordinates,
    //         zoom: 18,
    //         offset: [100,0]
    //       })
    //       // navigate(`/reviews/${name}`);
    //     });
    //   });
    //
    //});
  }, []);

  function escape() {
    setShowCard(false)
    mapRef.current.easeTo(mapDefaults)
  }

  return (
    <>
      {showCard ? <Card buildingId={buildingInfo.id} name={buildingInfo.name} rating={buildingInfo.rating}></Card> : null}
      <button class="escape-button" onClick={escape}>Reset View</button>
      <div id='map-inner-container' ref={mapContainerRef}/>
    </>
  )
}
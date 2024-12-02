import { useRef, useEffect } from 'react'
import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import Card from './Card';

export default function Map() {

  const mapRef = useRef()
  const mapContainerRef = useRef()
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
 
    mapRef.current.flyTo(mapDefaults); 
    
    const data = {
      type: "FeatureCollection",
      features: [],
    };

    const token = localStorage.getItem('token');
    let data2 = fetch('http://localhost:5000/api/buildings/', {
      headers:{
        "Authorization": "Bearer " + token
      }
    }).then(res=>res.json());
      
    // add markers to the map
    mapRef.current.on('load', () => {
      data2.then(res=>{
        // console.log(res.buildings)
        res.buildings.forEach(building=>{
          data.features.push(
            {type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [building.latitude, building.longitude],
              },
              properties:{
                id: building.id,
                name: building.name,
                rating: building.averageRating
              }
            })
        })
        data.features.forEach((feature) => {
          const coordinates = feature.geometry.coordinates;
          const {id, name, rating} = feature.properties;
          
          // make a new marker for each feature
          const marker = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .addTo(mapRef.current);
          
          // creaet an event marker for each feature aka each building
          marker.getElement().addEventListener('click', () => {
            // Have a database call here to get all bathrooms for building with name: name
            // Populate some sort of popup with 
            console.log(`Marker "${name}" clicked`);
            setBuildingInfo(feature.properties)
            setShowCard(true)
            mapRef.current.easeTo({
              center: coordinates,
              zoom: 18,
              offset: [100,0]
            })
            // navigate(`/reviews/${name}`);
          });
        });
      })

    });
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
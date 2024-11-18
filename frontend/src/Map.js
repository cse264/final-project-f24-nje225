import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { useNavigate } from 'react-router-dom';

import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map() {

  const mapRef = useRef()
  const mapContainerRef = useRef()
  const navigate = useNavigate();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3VsYmUiLCJhIjoiY2xubTF3Z25sMXJqZDJzbzJ4eGFjdTRwMSJ9.mQ3GOs7GFeNj30sbiXaj1g'
    // mapRef.current = new mapboxgl.Map({
    //   container: mapContainerRef.current,
    // });
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-77.1945, 41.2033],
      zoom: 2
    });
 
    console.log("flying")
    mapRef.current.flyTo({
      center: [-75.378259, 40.607314],
      zoom: 14,
      essential: true
    });   

    
    
    /*
    STEPS: -75.378544, 40.608357
    Linderman: -75.377018, 40.606679
    Hawks Nest: -75.376221, 40.605569
    */
    const data = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-75.379013, 40.607830],
          },
          properties:{
            name: "Packard"
          }
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-75.377284, 40.608541],
          },
          properties:{
            name: "Neville"
          }
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-75.377899, 40.608727],
          },
          properties:{
            name: "FML"
          }
        },
      ],
    };
      
    // add markers to the map
    mapRef.current.on('load', () => {
      data.features.forEach((feature) => {
        const coordinates = feature.geometry.coordinates;
        const {name} = feature.properties;

        // make a new marker for each feature
        const marker = new mapboxgl.Marker()
          .setLngLat(coordinates)
          .addTo(mapRef.current);

        // creaet an event marker for each feature aka each building
        marker.getElement().addEventListener('click', () => {
          console.log(`Marker "${name}" clicked`);
          navigate(`/reviews/${name}`);
        });
      });

    });
  }, []);

  return (
    <>
      <div id='map-inner-container' ref={mapContainerRef}/>
    </>
  )
}
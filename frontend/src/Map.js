import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map() {

  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY3VsYmUiLCJhIjoiY2xubTF3Z25sMXJqZDJzbzJ4eGFjdTRwMSJ9.mQ3GOs7GFeNj30sbiXaj1g'
    // mapRef.current = new mapboxgl.Map({
    //   container: mapContainerRef.current,
    // });
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [31.134799, 29.975990],
      zoom: 2
    });
 
    console.log("flying")
    mapRef.current.flyTo({
      center: [-74.0242, 40.6941],
      zoom: 10.12,
      essential: true
    });   

    mapRef.current.on('click', (event) => {
      console.log('clicked')
      // If the user clicked on one of your markers, get its information.
      const features = mapRef.current.queryRenderedFeatures(event.point, {
        layers: ['test-layer'] // replace with your layer name
      });
      if (!features.length) {
        console.log('no match')
        return;
      }
      console.log("match")
      // const feature = features[0];
    
      // Code from the next step will go here.
    });
    const data = 
    {
      "type": "Feature",
      "geometry": {
        "coordinates": [
          35.667067,
          7.541619
        ],
        "type": "Point"
      }
    }

  mapRef.current.on('load', () => {


    mapRef.current.addSource('data', {
      type: 'geojson',
      data: data,
      });

    mapRef.current.addLayer({
      'id': 'test-layer',
      'type': 'circle',
      'source': 'data',
      'layout': {
          'visibility': 'visible',
      },
      'paint': {
          'circle-radius': 40,
          'circle-color': 'rgba(255,0,255,0.5)'
      }
      });
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])



  return (
    <>
      <div id='map-container' ref={mapContainerRef}/>
    </>
  )
}
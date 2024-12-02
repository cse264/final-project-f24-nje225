import { useRef, useEffect, useState } from 'react'
import BathroomEntry from './BathroomEntry';

export default function Card(props) {

  const [data, setData] = useState([]);

  const token = localStorage.getItem('token');
  const key = "RL2W4WP6K3H2S8XEX27VL2CXT"; //TODO remove
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/bethlehem?include=current&key=${key}&contentType=json`);
      const jsonData = await response.json();
      setData(jsonData.days[0]);
    };

    fetchData();
  }, []);

  return(
    <div class="weather">
    {data.description}
    <br/>
    High: {data.tempmax}°F      Low: {data.tempmin}°F
    </div>
  )
}
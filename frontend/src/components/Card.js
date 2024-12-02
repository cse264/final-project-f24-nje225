import { useEffect, useState } from 'react'
import BathroomEntry from './BathroomEntry';

export default function Card(props) {

  const [data, setData] = useState([]);

  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/api/buildings/${props.buildingId}/bathrooms`, {
        headers:{
          "Authorization": "Bearer " + token
        }
      });
      const jsonData = await response.json();
      setData(jsonData.bathrooms);
    };

    fetchData();
  }, [props]);

  return(
    <div class="card">
        <h2 class="card-header">Bathrooms for {props.name}. Rating: {props.rating ? props.rating : "N/A"}</h2>
        <hr></hr>
        {data.map((item,index)=>(<><BathroomEntry data={item}></BathroomEntry><hr/></>))}
    </div>
  )
}
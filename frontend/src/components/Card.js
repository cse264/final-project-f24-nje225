import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BathroomEntry from './BathroomEntry';

export default function Card(props) {

  const navigate = useNavigate();

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
      console.log("fetched for " + props.name)
      setData(jsonData.bathrooms);
    };

    fetchData();
  }, [props]);

  return(
    <div class="card">
        <div class="card-header">Bathrooms for {props.name}. Rating: {props.rating}</div>
        {data.map((item,index)=>(<BathroomEntry buildingId={props.buildingId} bathroomId={item.id}></BathroomEntry>))}
    </div>
  )
}
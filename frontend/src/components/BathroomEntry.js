import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function BathroomEntry(props) {

  const mapRef = useRef()
  const mapContainerRef = useRef()
  const navigate = useNavigate();

  

  return(
    <div class="bathroom">
    THIS IS ONE SPECIFIC BATHROOM with id {props.bathroomId}
    <button onClick={()=>navigate(`/reviews/${props.buildingId}/${props.bathroomId}`)}>Link to reviews</button>
    </div>
  )
}
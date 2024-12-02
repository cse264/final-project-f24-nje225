import { useNavigate } from 'react-router-dom';

export default function BathroomEntry(props) {
  const navigate = useNavigate();

  const data = props.data;

  return(
    <div class="bathroom">
    <b>{Math.round(data.averageRating*10)/10}/5</b> {data.description}
    <button class="to-reviews" onClick={()=>navigate(`/reviews/${data.buildingId}/${data.id}`)}>Link to reviews</button>
    </div>
  )
}
import React from 'react';
import { useParams } from 'react-router-dom';

function Reviews() {
  const { id } = useParams();
  return (
    <div>
      <h1>{id} Bathroom Reviews</h1>
      <p>Placeholder page for reviews of {id} bathroom </p>
    </div>
  );
}

export default Reviews;
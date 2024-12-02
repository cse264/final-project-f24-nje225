import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For accessing route parameters
import axios from 'axios';

const Reviews = () => {
  const { id, bathroomId } = useParams(); // Extract buildingId and bathroomId from the route
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch reviews on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
      
        const res = await axios.get(`http://localhost:5000/api/buildings/${id}/bathrooms/${bathroomId}/reviews`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setReviews(res.data.reviews); // Assuming the backend sends reviews in a `reviews` array
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id, bathroomId]); // Re-run if buildingId or bathroomId changes

  return (
    <div style={{ padding: '20px', maxHeight: '100vh', overflowY: 'auto' }}>
      <h1>Bathroom Reviews</h1>
      {loading && <p>Loading reviews...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '15px',
                  boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                  marginBottom: '10px',
                }}
              >
                <h3>Rating: {review.rating}/5</h3>
                <p>{review.content}</p>
                <p style={{ fontSize: '12px', color: '#666' }}>
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews available for this bathroom.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;

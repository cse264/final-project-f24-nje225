import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For accessing route parameters
import axios from 'axios';

const Reviews = () => {
  const { id, bathroomId } = useParams(); // Extract buildingId and bathroomId from the route
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewContent, setReviewContent] = useState(''); // State for new review content
  const [reviewRating, setReviewRating] = useState(''); // State for new review rating

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      const storedToken = localStorage.getItem('token');
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `http://localhost:5000/api/buildings/${id}/bathrooms/${bathroomId}/reviews`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        const sortedReviews = res.data.reviews.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sortedReviews);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id, bathroomId]); // Re-run if buildingId or bathroomId changes

  // Add a new review
  const handleAddReview = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('token');

    if (!reviewContent.trim()) {
      alert('Review text cannot be empty');
      return;
    }

    try {
      setLoading(true);
      const body = {
        content: reviewContent,
        rating: parseInt(reviewRating, 10), // Convert rating to integer
      };

      const res = await axios.post(
        `http://localhost:5000/api/buildings/${id}/bathrooms/${bathroomId}/reviews`,
        body,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxHeight: '100vh', overflowY: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Bathroom Reviews</h1>

      {/* Add Review Form */}
      <form onSubmit={handleAddReview} style={{ marginBottom: '20px', textAlign: 'center'}}>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Enter Review..."
            style={{
              padding: '10px',
              width: '50%', // Adjust width here (or remove for responsive width)
              height: '300px', // Set desired height
              resize: 'none',
            }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="number"
            value={reviewRating}
            onChange={(e) => setReviewRating(e.target.value)}
            placeholder="Enter rating (1-5)"
            min="1"
            max="5"
            style={{
              padding: '10px',
              width: '10%', // Match the width of the textarea
              marginTop: '5px',
              border: '1px solid #ccc',
              textAlign: 'center', // Horizontally center placeholder
              borderRadius: '5px', // Rounded corners for aesthetics
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#2A5678',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Review
        </button>
      </form>

      {/* Reviews List */}
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
                  backgroundColor: '#F5F5DC',
                  boxShadow: '0px 4px 6px rgba(0,0,0,1)',
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
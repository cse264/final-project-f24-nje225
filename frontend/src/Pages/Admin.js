import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminScreen = () => {
  const [token, setToken] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fields for building actions
  const [buildingName, setBuildingName] = useState('');
  const [buildingLatitude, setBuildingLatitude] = useState('');
  const [buildingLongitude, setBuildingLongitude] = useState('');
  const [buildingDescription, setBuildingDescription] = useState('');
  const [buildingId, setBuildingId] = useState('');

  // Fields for bathroom actions
  const [bathroomName, setBathroomName] = useState('');
  const [bathroomDescription, setBathroomDescription] = useState('');

  // Fields for building, bathroom, and review actions
  const [bathroomId, setBathroomId] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState('');
  const [reviewId, setReviewId] = useState('');

  const [flaggedReviews, setFlaggedReviews] = useState([]);

  

  // Auto-populate token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    // fetch flagged reviews
    const fetchFlaggedReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get('http://localhost:5000/api/admin/reviews/flagged', {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        console.log(res.data.flaggedReviews);
        setFlaggedReviews(res.data.flaggedReviews);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchFlaggedReviews();
  }, []);

  // Delete a specific review
  const handleDeleteReview = async (reviewID) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // const res = await axios.delete(
      //   `http://localhost:5000/api/admin/reviews/${reviewID}`,
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
      // res.data.message = `Review with ID ${reviewID} deleted successfully`; use fetch instead
      const res = await fetch(`http://localhost:5000/api/admin/reviews/${reviewID}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponse({ message: `Review with ID ${reviewID} deleted successfully` });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all buildings
  const handleGetAllBuildings = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.get('http://localhost:5000/api/buildings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBathroom = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/bathrooms/${bathroomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponse({ message: `Bathroom with ID ${bathroomId} deleted successfully` });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Add a new building
  const handleAddBuilding = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const body = {
        name: buildingName,
        latitude: parseFloat(buildingLatitude),
        longitude: parseFloat(buildingLongitude),
        description: buildingDescription || null,
      };
      const res = await axios.post('http://localhost:5000/api/admin/buildings', body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all bathrooms in a building
  const handleGetBuildingBathrooms = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/buildings/${buildingId}/bathrooms`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Add a new bathroom to a building
  const handleAddBathroomToBuilding = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const body = {
        name: bathroomName,
        description: bathroomDescription || null,
      };
      const res = await axios.post(`http://localhost:5000/api/admin/buildings/${buildingId}/bathrooms`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Fetch reviews for a specific bathroom
  const handleGetBathroomReviews = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/buildings/${buildingId}/bathrooms/${bathroomId}/reviews`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Add a new review for a bathroom
  const handleAddBathroomReview = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const body = {
        content: reviewContent,
        rating: parseInt(reviewRating, 10), // Convert rating to an integer
      };
      const res = await axios.post(
        `http://localhost:5000/api/buildings/${buildingId}/bathrooms/${bathroomId}/reviews`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxHeight: '100vh', overflowY: 'auto' }}>
      <h1>Admin Suite</h1>

      {/* List of flagged reviews */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Flagged Reviews</h3>
        {loading ? (
          <p>Loading...</p>
        ) : flaggedReviews.length ? (
          <ul>
            {flaggedReviews.map((flag) => (
              <li key={flag.id}>
                <p>
                  <strong style={{margin: '5px'}}>Review ID: {flag.Review.id} </strong>
                  <strong style={{margin: '5px'}}>Content: {flag.Review.content} </strong> 
                  <button onClick={() => handleDeleteReview(flag.Review.id)} style={{ marginLeft: '10px' }}> Delete </button>
                </p>
                </li>
            ))}
          </ul>
        ) : (
          <p>No flagged reviews found</p>
        )}
      </div>


      {/* Buildings Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Buildings</h3>
        <button
          onClick={handleGetAllBuildings}
          style={{ padding: '10px 15px', cursor: 'pointer', marginRight: '10px' }}
        >
          Get All Buildings
        </button>
        <div style={{ marginTop: '20px' }}>
          <h4>Add a New Building</h4>
          <label>Building Name:</label>
          <input
            type="text"
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
            placeholder="Enter building name"
            style={{ padding: '5px', marginLeft: '10px' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label>Latitude:</label>
            <input
              type="text"
              value={buildingLatitude}
              onChange={(e) => setBuildingLatitude(e.target.value)}
              placeholder="Enter latitude"
              style={{ padding: '5px', marginLeft: '10px' }}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>Longitude:</label>
            <input
              type="text"
              value={buildingLongitude}
              onChange={(e) => setBuildingLongitude(e.target.value)}
              placeholder="Enter longitude"
              style={{ padding: '5px', marginLeft: '10px' }}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <label>Description (Optional):</label>
            <input
              type="text"
              value={buildingDescription}
              onChange={(e) => setBuildingDescription(e.target.value)}
              placeholder="Enter description"
              style={{ padding: '5px', marginLeft: '10px' }}
            />
          </div>
          <button
            onClick={handleAddBuilding}
            style={{ padding: '10px 15px', cursor: 'pointer', marginTop: '10px' }}
          >
            Add Building
          </button>
        </div>
      </div>

      {/* Bathrooms Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Building Bathrooms</h3>
        <label>Building ID:</label>
        <input
          type="text"
          value={buildingId}
          onChange={(e) => setBuildingId(e.target.value)}
          placeholder="Enter building ID"
          style={{ padding: '5px', marginLeft: '10px', marginBottom: '10px' }}
        />
        <button
          onClick={handleGetBuildingBathrooms}
          style={{ padding: '10px 15px', cursor: 'pointer', marginLeft: '10px' }}
        >
          Get Bathrooms in Building
        </button>
        <div style={{ marginTop: '20px' }}>
          <h4>Add Bathroom to Building</h4>
          <label>Bathroom Name:</label>
          <input
            type="text"
            value={bathroomName}
            onChange={(e) => setBathroomName(e.target.value)}
            placeholder="Enter bathroom name"
            style={{ padding: '5px', marginLeft: '10px' }}
          />
          <div style={{ marginTop: '10px' }}>
            <label>Bathroom Description (Optional):</label>
            <input
              type="text"
              value={bathroomDescription}
              onChange={(e) => setBathroomDescription(e.target.value)}
              placeholder="Enter bathroom description"
              style={{ padding: '5px', marginLeft: '10px' }}
            />
          </div>
          <button
            onClick={handleAddBathroomToBuilding}
            style={{ padding: '10px 15px', cursor: 'pointer', marginTop: '10px' }}
          >
            Add Bathroom to Building
          </button>
        </div>

        {/* Delete Bathroom */}
        <div style={{ marginTop: '20px' }}>
          <h4>Delete Bathroom</h4>
          <label>Bathroom ID:</label>
          <input
            type="text"
            value={bathroomId}
            onChange={(e) => setBathroomId(e.target.value)}
            placeholder="Enter bathroom ID"
            style={{ padding: '5px', marginLeft: '10px', marginBottom: '10px' }}
          />
          <button
            onClick={handleDeleteBathroom}
            style={{ padding: '10px 15px',backgroundColor: 'red', cursor: 'pointer', marginTop: '10px' }}
          >
            Delete Bathroom
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3>Bathroom Reviews</h3>
        <div>
          <label>Building ID:</label>
          <input
            type="text"
            value={buildingId}
            onChange={(e) => setBuildingId(e.target.value)}
            placeholder="Enter building ID"
            style={{ padding: '5px', marginLeft: '10px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Bathroom ID:</label>
          <input
            type="text"
            value={bathroomId}
            onChange={(e) => setBathroomId(e.target.value)}
            placeholder="Enter bathroom ID"
            style={{ padding: '5px', marginLeft: '10px', marginBottom: '10px' }}
          />
        </div>

        {/* Fetch Reviews */}
        <button
          onClick={handleGetBathroomReviews}
          style={{ padding: '10px 15px', cursor: 'pointer', marginBottom: '20px' }}
        >
          Get Reviews for Bathroom
        </button>

        {/* Add Review */}
        <h4>Add a New Review</h4>
        <div>
          <label>Review Content:</label>
          <input
            type="text"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
            placeholder="Enter review content"
            style={{ padding: '5px', marginLeft: '10px', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Rating (1-5):</label>
          <input
            type="number"
            value={reviewRating}
            onChange={(e) => setReviewRating(e.target.value)}
            placeholder="Enter rating (1-5)"
            min="1"
            max="5"
            style={{ padding: '5px', marginLeft: '10px', marginBottom: '10px' }}
          />
        </div>
        <button
          onClick={handleAddBathroomReview}
          style={{ padding: '10px 15px', cursor: 'pointer', marginBottom: '20px' }}
        >
          Add Review
        </button>

        {/* Delete Review */}
        <h4>Delete a Review</h4>
        <div>
          <label>Review ID:</label>
          <input
            type="text"
            value={reviewId}
            onChange={(e) => setReviewId(e.target.value)}
            placeholder="Enter review ID"
            style={{ padding: '5px', marginLeft: '10px', marginBottom: '10px' }}
          />
        </div>
        <button
          onClick={handleDeleteReview}
          style={{
            padding: '10px 15px',
            cursor: 'pointer',
            backgroundColor: 'red', // Red background
            color: 'white', // White text
            border: 'none',
            borderRadius: '5px', // Optional rounded corners
            marginBottom: '20px',
          }}
        >
          Delete Review
        </button>

      </div>

      {/* Response Display */}
      <div>
        <h3>Response</h3>
        {loading ? (
          <p>Loading...</p>
        ) : response ? (
          <pre>{JSON.stringify(response, null, 2)}</pre>
        ) : null}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default AdminScreen;
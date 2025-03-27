import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import adminAxios from "../api/AdminAuthAPI";

function BookReviewPage({ isAdmin }) {
  const [bookReview, setBookReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookReview = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(`/api/book/${bookId}`);
        setBookReview(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch book review"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookReview();
  }, [bookId]);

  const handleDeleteReview = async () => {
    try {
      const response = await adminAxios.delete(`/api/book/${bookId}`);
      if (response.status === 200) {
        // Review deleted successfully
        navigate("/book"); // Redirect to the list page after deletion
      } else {
        setError(response.data.message || "Failed to delete book review");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete book review");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {bookReview && (
        <div>
          <h2>{bookReview.title}</h2>
          <h3>{bookReview.subTitle}</h3>
          <p>Authors: {bookReview.authors}</p>
          <div
            style={{
              display: "flex",
              alignItems: "start",
              margin: "10px auto",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {bookReview.thumbnail && (
              <img src={bookReview.thumbnail} alt={bookReview.title} />
            )}

            <p>
              Full Description:{" "}
              {bookReview.fullDescription || "No description available"}
            </p>
          </div>

          <p>Genres: {bookReview.genres}</p>
          <p>Description: {bookReview.descriptionShort}</p>
          <p>How it changed me: {bookReview.howChangedMe}</p>
          <p>Who should read it: {bookReview.whoShouldRead}</p>
          <p>Impressions: {bookReview.impressions}</p>
          <p>Rating: {bookReview.rating}</p>
          {isAdmin && (
            <>
              <button onClick={() => navigate(`/book/${bookId}/edit`)}>
                Edit Review
              </button>
              <button onClick={handleDeleteReview}>Delete Review</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BookReviewPage;

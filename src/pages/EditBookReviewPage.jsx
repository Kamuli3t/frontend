import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import adminAxios from "../api/AdminAuthAPI";

function EditBookReviewPage() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    descriptionShort: "",
    howChangedMe: "",
    whoShouldRead: "",
    impressions: "",
    rating: "",
  });

  const [bookInfo, setBookInfo] = useState({ title: "", thumbnail: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/api/book/${bookId}`);
        const {
          title,
          thumbnail,
          descriptionShort,
          howChangedMe,
          whoShouldRead,
          impressions,
          rating,
        } = response.data;

        setBookInfo({ title, thumbnail });

        setFormData({
          descriptionShort,
          howChangedMe,
          whoShouldRead,
          impressions,
          rating,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch review.");
      }
    };
    fetchReview();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminAxios.put(`/api/book/${bookId}`, formData);
      navigate(`/book/${bookId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update review.");
    }
  };

  return (
    <>
      <h2>Edit Review</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          alignItems: "start",
          margin: "10px auto",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h3>{bookInfo.title}</h3>
          {bookInfo.thumbnail && (
            <img
              src={bookInfo.thumbnail}
              alt={bookInfo.title}
              style={{ maxWidth: "200px", borderRadius: "4px" }}
            />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Short Description:
            <br />
            <textarea
              name="descriptionShort"
              value={formData.descriptionShort}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            How it changed me:
            <br />
            <textarea
              name="howChangedMe"
              value={formData.howChangedMe}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Who should read it:
            <br />
            <textarea
              name="whoShouldRead"
              value={formData.whoShouldRead}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Impressions:
            <br />
            <textarea
              name="impressions"
              value={formData.impressions}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Rating:
            <br />
            <input
              name="rating"
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit" style={{ marginTop: "1rem" }}>
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}

export default EditBookReviewPage;

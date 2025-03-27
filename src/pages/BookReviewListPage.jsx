import React, { useState, useEffect } from "react";
import axios from "axios";
import BookReviewCard from "../components/BookReviewCard";
import adminAxios from "../api/AdminAuthAPI";

function BookReviewListPage() {
  const [bookReviews, setBookReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin] = useState(true);
  const [newReview, setNewReview] = useState({
    bookId: "",
    bookData: null,
    descriptionShort: "",
    howChangedMe: "",
    whoShouldRead: "",
    impressions: "",
    rating: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const fetchBookReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("/api/book");
      setBookReviews(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch book reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookReviews();
  }, []);

  // Debouncing effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 700); // Debounce time ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Google Books API search
  useEffect(() => {
    if (debouncedSearchTerm) {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${debouncedSearchTerm}&maxResults=4`
          );
          setSearchResults(response.data.items || []);
        } catch (error) {
          setError(
            error.response?.data?.message || "Error fetching search results"
          );
        }
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      // Backend expects bookData to be directly in the request body
      const response = await adminAxios.post("/api/book", {
        bookId: newReview.bookId,
        bookData: newReview.bookData, // Use the bookData from state
        descriptionShort: newReview.descriptionShort,
        howChangedMe: newReview.howChangedMe,
        whoShouldRead: newReview.whoShouldRead,
        impressions: newReview.impressions,
        rating: newReview.rating,
      });

      if (response.status === 201) {
        // Fetch the updated list of book reviews (optional, but good for UI update)
        fetchBookReviews();
        // Clear the form
        setNewReview({
          bookId: "",
          bookData: null,
          descriptionShort: "",
          howChangedMe: "",
          whoShouldRead: "",
          impressions: "",
          rating: "",
        });
      } else {
        setError(response.data.message || "Failed to create book review");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create book review");
    }
  };

  const handleSearchResultClick = (book) => {
    setNewReview({
      bookId: book.id,
      bookData: {
        title: book.volumeInfo.title,
        subTitle: book.volumeInfo.subtitle || "N/A",
        authors: book.volumeInfo.authors?.join(", ") || "N/A",
        thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        description: book.volumeInfo.description || "No description available",
        categories: book.volumeInfo.categories || ["Uncategorized"],
      },
      descriptionShort: "",
      howChangedMe: "",
      whoShouldRead: "",
      impressions: "",
      rating: "",
    });
    setSearchResults([]);
    setSearchTerm("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Book Reviews</h2>
      {/* List of reviewed books on card display */}
      {bookReviews.map((review) => (
        <BookReviewCard key={review._id} review={review} />
      ))}
      {/* Admin form to create a new book review */}
      {isAdmin && (
        <div>
          <h2>Create New Book Review</h2>
          {/* Search Functionality */}
          <div>
            <label>Search for a book:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Display Search Results */}
          {searchResults.length > 0 && (
            <div>
              <h6>Search Results</h6>
              <ul>
                {searchResults.map((book) => (
                  <li
                    key={book.id}
                    onClick={() => handleSearchResultClick(book)}
                    style={{ cursor: "pointer" }}
                  >
                    {book.volumeInfo.imageLinks?.smallThumbnail && (
                      <img
                        src={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                        style={{ marginRight: "10px" }}
                      />
                    )}
                    {book.volumeInfo.title} by{" "}
                    {book.volumeInfo.authors?.join(", ") || "N/A"}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleCreateReview}>
            <div>
              <label>Book ID:</label>
              <input
                type="text"
                value={newReview.bookId}
                onChange={(e) =>
                  setNewReview({ ...newReview, bookId: e.target.value })
                }
                readOnly // readonly if changed it will wreck my backend
              />
            </div>
            <div style={{ display: "none" }}>
              <label>Book Data:</label>
              <textarea
                value={
                  newReview.bookData ? JSON.stringify(newReview.bookData) : ""
                }
                readOnly
              />
            </div>
            <div>
              <label>Short Description:</label>
              <textarea
                value={newReview.descriptionShort}
                onChange={(e) =>
                  setNewReview({
                    ...newReview,
                    descriptionShort: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>How it changed me:</label>
              <textarea
                value={newReview.howChangedMe}
                onChange={(e) =>
                  setNewReview({ ...newReview, howChangedMe: e.target.value })
                }
              />
            </div>
            <div>
              <label>Who should read it:</label>
              <textarea
                value={newReview.whoShouldRead}
                onChange={(e) =>
                  setNewReview({ ...newReview, whoShouldRead: e.target.value })
                }
              />
            </div>
            <div>
              <label>Impressions:</label>
              <textarea
                value={newReview.impressions}
                onChange={(e) =>
                  setNewReview({ ...newReview, impressions: e.target.value })
                }
              />
            </div>
            <div>
              <label>Rating:</label>
              <input
                type="number"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: e.target.value })
                }
              />
            </div>
            <button type="submit">Create Review</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookReviewListPage;

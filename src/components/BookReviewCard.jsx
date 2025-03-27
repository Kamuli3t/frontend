import React from "react";
import { Link } from "react-router-dom";

function BookReviewCard({ review }) {
  return (
    <div
      className="book-review-card"
      style={{ border: "1px solid black", padding: "1rem", margin: "1rem" }}
    >
      <h4>
        <Link to={`/book/${review._id}`}>{review.title}</Link>
      </h4>
      <p>Authors: {review.authors}</p>
      <p>{review.subTitle}</p>
      {review.thumbnail && <img src={review.thumbnail} alt={review.title} />}
    </div>
  );
}

export default BookReviewCard;

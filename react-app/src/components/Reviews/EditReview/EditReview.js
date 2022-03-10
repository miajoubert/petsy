import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editAReview } from "../../../store/reviews";

const EditReviewForm = ({onClose, reviewId}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { id } = useParams();
  const reviews = useSelector((state) => state.reviewsReducer[reviewId]);
  const history = useHistory();

  const [review, setReview] = useState(reviews?.review || "");
  const [rating, setRating] = useState(reviews?.rating || "");
  const [created_at, setCreatedAt] = useState(reviews?.created_at || "");

  console.log('reviews', reviews)

  useEffect(() => {
    if (reviews) {
      setReview(reviews.review);
      setRating(reviews.rating);
    }
  }, [reviews]);

  const handleEditReview = async (e) => {
    e.preventDefault();
    const payload = {
      reviewId,
      review,
      rating,
      created_at
    };

    console.log('payload', payload)
    const updatedReview = await dispatch(editAReview(payload));
    if (updatedReview) {
      history.push(`/products/${id}`);
    }
  };

  return (
    <div className="edit-review-container">
      <form className="edit-review" onSubmit={handleEditReview}>
        <div className="review">
          <label> Update Review </label>
          <textarea
            type="text"
            placeholder="Review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div className="rating">
          <label> Update Rating </label>
          <input
            type="number"
            min="1"
            max="5"
            step="1"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div className="created-at-input">
          <input type="hidden" value={created_at} />
        </div>
        <button className="edit-review-button" type="submit">
          Submit
        </button>
        <button className="cancel-edit-button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditReviewForm;

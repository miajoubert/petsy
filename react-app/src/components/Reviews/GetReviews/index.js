import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllReviews } from "../../../store/reviews";
import { deleteAReview } from "../../../store/reviews";
import { useHistory } from "react-router-dom";
import EditReviewModal from "../EditReview";

const AllReviews = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector((state) => state.reviewsReducer);
  const product = useSelector((state) => state.productsReducer[id]);
  const history = useHistory();
  const reviewsArr = Object.values(reviews);

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  function handleReviewDelete(e, reviewId) {
    e.preventDefault()
    dispatch(deleteAReview(reviewId))
    history.push(`/products/${id}`);
  };


  return (
    <div>
      {reviewsArr.map((review) => {
        if (review.product_id === product.id) {
          return (
            <div key={review?.id} className="review-container">
              <div>{review?.rating}</div>
              <div>{review?.review}</div>
              <button
                className="delete-review-button"
                onClick={(e) => handleReviewDelete(e, review?.id)}
              >
                Delete
              </button>
              <div>
                <EditReviewModal/>
              </div>
            </div>
          );
        } else return null;
      })}
    </div>
  );
};

export default AllReviews;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllReviews } from "../../../store/reviews";

const AllReviews = () => {
  // const [reviewsList, setReviewsList] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector((state) => state.reviewsReducer);
  console.log("5555", reviews);
  const product = useSelector((state) => state.productsReducer[id]);

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const reviewsArr = Object.values(reviews);

  return (
    <div>
      {reviewsArr.map((review) => {
        if (review.product_id === product.id) {
          return (
            <div className="all-reviews-container">
              <div>{review?.rating}</div>
              <div>{review?.review}</div>
            </div>
          );
        }
        else return null
      })}
    </div>
  );
};

export default AllReviews;

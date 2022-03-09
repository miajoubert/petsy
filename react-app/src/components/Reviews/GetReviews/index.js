import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../../store/reviews";
import { getSingleProduct } from "../../../store/products";

const AllReviews = () => {
  const [reviewsList, setReviewsList] = useState([]);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviewsReducer);
  const product = useSelector((state) => state.productsReducer);
  console.log('3333333333333', reviews)

  console.log("2222222", product);

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  useEffect(() => {
    if (reviews) {
      setReviewsList(Object.values(reviews));
    }
  }, [reviews]);

  return (
    <div>
      {reviewsList.map((review) => (
        <div className="all-reviews-container">
          {product?.id === review?.product_id && (
          <div>
                {review.review}
          </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllReviews;

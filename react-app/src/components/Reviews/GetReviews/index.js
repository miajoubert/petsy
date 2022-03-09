import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../../store/reviews";

const AllReviews = () => {
    const [reviewsList, setReviewsList] = useState([]);
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviewsReducer);

    useEffect(() => {
        dispatch(getAllReviews());
    }, [dispatch]);

    useEffect(() => {
        if (reviews) {
          setReviewsList(Object.values(reviews))
        }
    }, [reviews]);

    return(
        <div>
            {reviewsList.map((review) => (
                <div className="all-reviews-container">
                    {review?.review}
                </div>
            ))}
        </div>
    )
}

export default AllReviews;
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { populateCart } from "../../../store/cart";
import { getSingleProduct, deleteSingleProduct } from "../../../store/products";
import EditProductModal from "../EditProduct ";
import AllReviews from "../../Reviews/GetReviews";
import Reviews from "../../Reviews/CreateReview";
import "./ProductDetail.css";
import reviewsReducer from "../../../store/reviews";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const productId = +id;

  const product = useSelector((state) => state.productsReducer[id]);
  const userId = useSelector((state) => state.session.user?.id);
  const user = useSelector((state) => state.session.user);
  const category = useSelector((state) => state.categories[id]);
  const reviews = useSelector((state) => state.reviewsReducer);
  const reviewsArr = Object.values(reviews);
  const productReviews = reviewsArr.filter(
    (review) => review.product_id === productId
  );
  console.log("productReviews", productReviews);
  console.log("reviewsArr", reviewsArr);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  if (!product) {
    return null;
  }

  async function handleDelete(e) {
    e.preventDefault();
    await dispatch(deleteSingleProduct(id));
    history.push("/products");
  }
  const overallRating = (productReviews) => {
    return productReviews?.reduce(function (prevValue, review) {
      return prevValue + review.rating;
    }, 0);
  };

  let rating = Math.round(
    overallRating(productReviews) / productReviews.length
  );

  return (
    <div className="product_detail-container">
      <div className="product">
        <div className="product-image">
          <img
            width={450}
            height={450}
            alt={product?.name}
            src={
              product?.image_url
                ? product?.image_url
                : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
            }
          />
                  <div className="reviews-display">
          {userId && userId !== product?.seller_id && (
            <div className="add-review-modal">
              <Reviews />
            </div>
          )}
          <h2> Reviews </h2>

          <AllReviews />
        </div>
        </div>
        <div className="product-info-container">
          <h2>{product.name}</h2>
          <div>
            {rating > 0 &&
              Array(rating)
                .fill(
                  <span>
                    <i className="fas fa-star"></i>
                  </span>
                )
                .map((star, idx) => <span key={idx}>{star}</span>)}
          </div>
          <h3>{product.category_name}</h3>

          <div className="product-price">
            ${parseFloat(product.price).toFixed(2)}
          </div>
          <div className="product-description">{product.description}</div>
          <label className="size-text">Size</label>
          <select className="size-selector">
            <option value="" selected="">
              Select an option
            </option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
          {userId && (
            <button
              className="add-to-cart-btn"
              onClick={() => dispatch(populateCart(product))}
            >
              Add to Cart
            </button>
          )}
          <div className="product-btn-container">
            {userId && userId === product.seller_id && <EditProductModal />}
            {userId && userId === product.seller_id && (
              <button className="delete-btn" onClick={handleDelete}>
                Delete Your Product
              </button>
            )}
          </div>
          <div className="bottom-right-container">
          <h2>Shipping and return policies</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h2>FAQs</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h2>Meet Your Seller</h2>
          <h3>{product.username}</h3>
      </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

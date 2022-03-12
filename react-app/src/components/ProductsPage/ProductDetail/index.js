import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { populateCart } from "../../../store/cart";
import { getSingleProduct, deleteSingleProduct } from "../../../store/products";
import EditProductModal from "../EditProduct ";
import AllReviews from "../../Reviews/GetReviews";
import Reviews from "../../Reviews/CreateReview";
import "./ProductDetail.css";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const product = useSelector((state) => state.productsReducer[id]);
  const userId = useSelector((state) => state.session.user?.id);
  // const reviews = useSelector((state) => state.reviewsReducer);

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
        </div>
        <div className="product-info-container">
          <h2>{product.name}</h2>

          <div className="product-price">
            ${parseFloat(product.price).toFixed(2)}
          </div>
          <div className="product-description">{product.description}</div>

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
                DELETE
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="reviews-display">
        {userId && userId !== product?.seller_id && (
          <div className="add-review-modal">
            <Reviews />
          </div>
        )}
        <h2> User Reviews </h2>

        <AllReviews />
      </div>
    </div>
  );
};

export default SingleProduct;

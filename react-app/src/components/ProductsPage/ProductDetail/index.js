import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSingleProduct, deleteSingleProduct } from "../../../store/products";
import EditProductModal from "../EditProduct ";
import AllReviews from "../../Reviews/GetReviews";
import Reviews from "../../Reviews/GetReviews/reviews";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const product = useSelector((state) => state.productsReducer[id]);
  const userId = useSelector((state) => state.session.user?.id);
  const reviews = useSelector(state => state.reviewsReducer);
  console.log('22222222222', reviews)
  const redirect = () => history.replace("/products");

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  if (!product) {
    return null;
  }

  async function handleDelete() {
    await dispatch(deleteSingleProduct(id));
    redirect();
  }

  return (
    <div className="product_detail-container">
      <p>{product.name}</p>
      <div className="product_image">
        <img
          width={300}
          height={300}
          alt={product?.name}
          src={
            product?.image_url
              ? product?.image_url
              : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
          }
        />
      </div>
      <div className="product_price">${product?.price}</div>
      <div>Quantity</div>
      <h2> Description </h2>
      <div>{product.description}</div>
      <EditProductModal />
      <button className="delete_btn" onClick={handleDelete}>
        DELETE
      </button>

      {/* {product.id === reviews.product_id && ( */}
        <div>
        <h2> User Reviews </h2>
        <AllReviews/>
        <Reviews/>
        </div>
        {/* )} */}
    </div>
  );
};

export default SingleProduct;

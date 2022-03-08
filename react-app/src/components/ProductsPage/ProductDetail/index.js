import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import productsReducer, { getSingleProduct, deleteSingleProduct } from "../../../store/products";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { id } = useParams();

  const product = useSelector((state) => state.productsReducer[id]);
  const userId = useSelector((state) => state.session.user?.id);
  const redirect = () => history.replace("/products")

  


  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  if (!product) {
    return null;
  }

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteSingleProduct(id, product))
    redirect()
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
      <div className="product_price">${product.price}</div>
      <div>
          Quantity
      </div>
      <h2> Description </h2>
      <div>
          {product.description}
      </div>
      <button className="delete_btn" onClick={handleDelete}>DELETE</button>
      <h2> User Reviews </h2>
    </div>
  );
};

export default SingleProduct;

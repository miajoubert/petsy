import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import productsReducer, { getSingleProduct } from "../../../store/products";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const product = useSelector((state) => state.productsReducer[id]);
  const userId = useSelector((state) => state.session.user?.id);


  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  if (!product) {
    return null;
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
      <h2> User Reviews </h2>
    </div>
  );
};

export default SingleProduct;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { getCategory } from "../../store/category";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { id } = useParams();
  const category = useSelector((state) => state.categories[id]);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategory(parseInt(id)));
  }, [dispatch, id]);

  return (
    <div className='category-products-container'>
      {category?.products.map(product => (
        <div key={product?.id} className='product-container'>
          <Link to={`/products/${product?.id}`}>
            <img className='product-image'
              width={300}
              height={300}
              alt={product?.name}
              src={
                product?.image_url
                  ? product?.image_url
                  : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
              } />
            <div className="product-name">{product?.name}</div>
          </Link>
          <div className="product-price">${product?.price}</div>
        </div>
      ))}
    </div>
  )
};

export default CategoryPage;

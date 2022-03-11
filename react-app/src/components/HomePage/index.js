import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllProducts } from "../../store/products";
import { getCategories } from "../../store/category";
import "./HomePage.css";

// Function to limit number of products showing unless we do it on backend

// For now, returning the same data as the AllProducts component

const HomePage = () => {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const products = useSelector((state) => state.productsReducer);

  const categoriesObj = useSelector((state) => state.categories);
  const categories = Object.values(categoriesObj);
  // categories.map((category) => ('5555555', category.products));
  // ('%%%%%%%%%%%', categoryProducts)

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      setProductList(Object.values(products));
    }
  }, [products]);

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id} className="category-container">
          {productList.map((product) => (
            <div className="all-products-container">
              <div className="product_images">
                <h2>{category.name}</h2>
                <Link
                  key={`single_product_link_${product?.id}`}
                  to={`/products/${product?.id}`}
                >
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
                </Link>
                <h4 className="product_name">{product?.name}{category.name}</h4>
                <h5 className="product_price">${product?.price}</h5>
              </div>
            </div>
          ))}
          <div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

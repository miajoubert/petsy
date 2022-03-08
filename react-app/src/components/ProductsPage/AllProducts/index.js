import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../store/products";

const AllProducts = () => {
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector(state => state.productsReducer);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      setProductList(Object.values(products))
    }
  }, [products]);

  return (
    <div>
      {productList.length &&
        productList.map((product) => (
          <div className="all-products-container">
            <div className="product_images">
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
            </div>
            <div className="product_name">{product?.name}</div>
            <div className="product_price">${product?.price}</div>
          </div>
        ))}
    </div>
  );
};

export default AllProducts;

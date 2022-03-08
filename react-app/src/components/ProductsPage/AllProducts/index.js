import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../store/products";
const AllProducts = () => {
  const [productList, setProductList] = useState([])
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      console.log("products", products);
      setProductList(Object.values(products))
    }
  }, [products]);

  return (
    <div className="all-products-container">
      {productList.length &&
        productList.map((product) => (
              <Link
            key={`single_product_link_${product.id}`}
            to={`/products/${product?.id}`}
          >
            <img
              width={"auto"}
              height={500}
              alt={product?.name}
              src={
                product?.image_url
                  ? product?.image_url
                  : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
              }
            />
          </Link>


            // <p>{product.name}</p>
 
        ))}
    </div>
  );
};

export default AllProducts;
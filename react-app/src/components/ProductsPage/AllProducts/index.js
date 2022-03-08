import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../store/product";
import "./Products.css";

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state?.product?.products)
  const productsObj = Object.values(products)


  useEffect(() => {
    dispatch(getAllProducts);
  }, [dispatch]);

  return (
    <div className="all-products-container">
      <div className="all-products">
        {productsObj.map((product) => (
          <div key={product?.id}>
            <Link to={`/products/${product?.id}`}>
              <img
                width={"auto"}
                height={500}
                alt={product?.name}
                src={
                  product?.image_url[0]
                    ? product?.image_url
                    : "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
                }
              />
            </Link>
            <div>
                {product?.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;

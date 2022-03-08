import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts} from "../../../store/products";
const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.products;
  });
  const productsObj = Object.values(products);

  useEffect(() => {
    dispatch(getAllProducts);
  }, [dispatch]);

  return (
    <div className="all-products-container">
        {productsObj.map((product) => (
            <Link key={product?.id} to={`/products/${product?.id}`}>
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
        ))}
    </div>
  );
};

export default AllProducts;

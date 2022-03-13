import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editOneProduct } from "../../../store/products";

const EditProduct = ({ onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  const product = useSelector((state) => state.productsReducer[id]);

  const [name, setName] = useState(product?.name || "");
  const [image_url, setImageUrl] = useState(product?.image_url || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [category_id, setCategoryId] = useState(product?.category_id || "");
  const [created_at] = useState(product?.created_at || "");
  const [errorValidator, setErrorValidator] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!name) errors.push("Please provide a name");
    if (!image_url.length) errors.push("Please provide a valid URL");
    if (image_url.length > 0 && !image_url.match(/^https?:\/\/.+\/.+$/))
      errors.push("Please provide a valid URL");
    if (!description) errors.push("Please provide a description");
    if (!price) errors.push("Please provide a price");
    if (category_id < 1 || category_id > 8)
      errors.push("Category Id must be between 1 to 8");
    setErrorValidator(errors);
  }, [name, image_url, description, price, category_id]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImageUrl(product.image_url);
      setDescription(product.description);
      setPrice(product.price);
      setCategoryId(product.category_id);
    }
  }, [product]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...product,
      name,
      image_url,
      description,
      price,
      category_id,
      created_at,
    };

    const updatedProduct = await dispatch(editOneProduct(payload));
    if (updatedProduct) {
      history.push(`/products/${product.id}`);
      onClose(false);
    }
  };

  return (
    <form className="edit-product-container" onSubmit={handleEditSubmit}>
      <ul>
        {errorValidator.map((error) => (
          <li className="error-list" key={error}>
            {error}
          </li>
        ))}
      </ul>
      <div>
        <label> Name </label>
        <input
          id="form-label-name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="edit_product_input-bar"
        />
      </div>
      <div>
        <label> Image </label>
        <input
          id="form-label-image"
          type="text"
          placeholder="Image"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          className="edit_product_input-bar"
        />
      </div>
      <div>
        <label> Description </label>
        <textarea
          id="form-label-description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="edit_product_description_input-bar"
        />
      </div>
      <div>
        <label> Price </label>
        <input
          id="form-label-price"
          type="number"
          step="0.01"
          pattern="^(./d{1,2}?$)"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="edit_product_input-bar"
        />
      </div>
      <div className="price-input">
        <label> Category Id </label>
        <input
          id="form-label-price"
          type="number"
          placeholder="Category Id"
          // required
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
          className="edit_product_input-bar"
        />
      </div>
      <div className="created-at-input">
        <input type="hidden" value={created_at} />
      </div>
      <div className="edit-product">
        <button
          className="edit-product-button"
          type="submit"
          disabled={errorValidator.length > 0}
        >
          Submit
        </button>
        <button className="cancel-edit-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProduct;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { editOneProduct } from "../../../store/products";

const EditProduct = ({ onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const { id } = useParams();
  const product = useSelector((state) => state.productsReducer[id]);

  const [productId, setId] = useState(product?.id || "");
  const [name, setName] = useState(product?.name || "");
  const [image_url, setImageUrl] = useState(product?.image_url || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [category_id, setCategoryId] = useState(product?.category_id || "");
  const [created_at, setCreatedAt] = useState(product?.created_at || "");

  useEffect(() => {
    if (product) {
      setId(product.id);
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
      user,
    };

    const updatedProduct = await dispatch(editOneProduct(payload));
    if (updatedProduct) {
      history.push(`/products/${product.id}`);
      onClose(false)
    }
  };

  return (
    <div className="edit-product-container">
      <form className="edit-product" onSubmit={handleEditSubmit}>
        <h2>Edit Your Product</h2>
        <div className="name-input">
          <label> Name </label>
          <input
            id="form-label-name"
            placeholder="Name"
            // required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="image-input">
          <label> Image </label>
          <input
            id="form-label-image"
            type="text"
            placeholder="Image"
            // required
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="description-input">
          <label> Description </label>
          <textarea
            id="form-label-description"
            placeholder="Description"
            // required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="price-input">
          <label> Price </label>
          <input
            id="form-label-price"
            type="number"
            step="0.01"
            pattern="^(./d{1,2}?$)"
            placeholder="Price"
            // required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
          />
        </div>
        <div className="created-at-input">
          <input type="hidden" value={created_at} />
        </div>
        <button className="edit-product-button" type="submit">
          Submit
        </button>
        <button className="cancel-edit-button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

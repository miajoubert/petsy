import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editOneProduct } from "../../../store/products";

const EditProduct = ({ hideForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const { id } = useParams();
  const product = useSelector((state) => state.productsReducer[id]);

  console.log("11111111111111", product);

  const [name, setName] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category_id, setCategoryId] = useState("");

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: product.id,
      name,
      image_url,
      description,
      price,
      category_id,
    };
    console.log('222222222222222', payload)
    const updatedProduct = await dispatch(editOneProduct(payload));
    if (updatedProduct) {
      hideForm();
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
        <button className="add-product-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProduct

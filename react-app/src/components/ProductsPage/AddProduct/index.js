import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addAProduct } from "../../../store/products";

const AddProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [image, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [errors, setErrors] = useState("");

  // useEffect(() => {
  //     if (!user) {
  //         history.push('/')
  //     }
  // }, [user, history])

  const newProductSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId: user.id,
      name,
      image,
      description,
      price,
      categoryId,
    };
    const newProduct = await dispatch(addAProduct(payload));
    if (newProduct) {
      history.push(`/product/${newProduct.id}`);
      // reset()
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/products");
  };
  // const reset = () => {
  //     setName(''),
  //     setImageUrl(''),
  //     setDescription(''),
  //     setPrice(0),
  //     setCategoryId(0)
  // }

  return (
    <div>
      <form className="new-product-form" onSubmit={newProductSubmit}>
        <div className="new-product-title"> List Your Product</div>
        <div className="name-input">
          <label> Name </label>
          <input id='form-label-name'
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="image-input">
          <label> Image </label>
          <input id='form-label-image'
            type="text"
            placeholder="Image"
            required
            value={image}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="description-input">
          <label> Description </label>
          <textarea id='form-label-description'
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="price-input">
          <label> Price </label>
          <input id='form-label-price'
            type="number"
            placeholder="Price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className="add-product-button" type="submit">
          Submit
        </button>
        <button className="cancel-add-product-button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddProduct;

import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditProduct from "./EditProduct";

const EditProductModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-product-modal" onClick={() => setShowModal(true)}>
        EDIT
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProduct />
        </Modal>
      )}
    </>
  );
};

export default EditProductModal

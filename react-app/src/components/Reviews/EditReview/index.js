import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditReviewForm from "./EditReview";

const EditReviewModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-review-modal" onClick={() => setShowModal(true)}>
        Edit Your Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm onClose={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
};

export default EditReviewModal;

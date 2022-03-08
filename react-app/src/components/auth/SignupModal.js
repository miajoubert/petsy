import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

const SignupFormModal = () => {
  const [ showModal, setShowModal ] = useState(false);

  return (
    <>
      <button className='nav-login' onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
};

export default SignupFormModal;

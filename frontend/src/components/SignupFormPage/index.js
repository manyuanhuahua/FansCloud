import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';


function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='signup-button' onClick={() => setShowModal(true)}>Create account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;

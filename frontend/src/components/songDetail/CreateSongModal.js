import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSongForm from './CreateSongForm';


function CreateSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSongForm />
        </Modal>
      )}
    </>
  );
}

export default CreateSongModal;

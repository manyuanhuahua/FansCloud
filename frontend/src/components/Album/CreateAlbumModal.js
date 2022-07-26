import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateAlbumForm from './CreateAlbumForm';


function CreateAlbumModal() {
  const [showModal, setShowModal] = useState(false);
  



  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateAlbumForm hideModal={()=>setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default CreateAlbumModal;

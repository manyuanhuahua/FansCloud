import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateAlbumForm from './CreateAlbumForm';


function CreateAlbumModal({isUpload, setIsUpload}) {
  const [showModal, setShowModal] = useState(false);




  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateAlbumForm hideModal={()=>setShowModal(false)} isUpload={isUpload}  setIsUpload={setIsUpload}/>
        </Modal>
      )}
    </>
  );
}

export default CreateAlbumModal;

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSongForm from './CreateSongForm';


function CreateSongModal({albumId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSongForm hideModal={()=>setShowModal(false)} albumId={albumId}/>
        </Modal>
      )}
    </>
  );
}

export default CreateSongModal;

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePlaylistAlert from './DeletePlaylistAlert';


function DeletePlaylistModal({playlist}) {
  const [showModal, setShowModal] = useState(false);




  return (
    <>
      <i className="fa-solid fa-trash-can" onClick={() => setShowModal(true)}></i>
      {/* <button >Delete</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePlaylistAlert hideModal={()=>setShowModal(false)} playlist={playlist} />
        </Modal>
      )}
    </>
  );
}

export default DeletePlaylistModal;

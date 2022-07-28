import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteAlbumAlert from './DeleteAlbumAlert';


function DeleteAlbumModal({album}) {
  const [showModal, setShowModal] = useState(false);




  return (
    <>
      <i className="fa-solid fa-trash-can" onClick={() => setShowModal(true)}></i>
      {/* <button >Delete</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteAlbumAlert hideModal={()=>setShowModal(false)} album={album} />
        </Modal>
      )}
    </>
  );
}

export default DeleteAlbumModal;

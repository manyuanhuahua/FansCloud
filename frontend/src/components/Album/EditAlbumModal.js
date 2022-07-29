import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditAlbumForm from './EditAlbumForm';


function EditAlbumModal({album}) {
  const [showModal, setShowModal] = useState(false);




  return (
    <>
      <i className="fa-solid fa-pen" onClick={() => setShowModal(true)}></i>
      {/* <button >Edit Album</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditAlbumForm hideModal={()=>setShowModal(false)} album={album}/>
        </Modal>
      )}
    </>
  );
}

export default EditAlbumModal;
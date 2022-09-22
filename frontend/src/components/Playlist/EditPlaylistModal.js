import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditAlbumForm from './EditPlaylistForm';


function EditPlaylistModal({playlist, editModal,setEditModal}) {
  const [showModal, setShowModal] = useState(false);






  return (
    <>
      <i className="fa-solid fa-pen" onClick={()=>setShowModal(true)}></i>
      {/* <button >Edit Album</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditAlbumForm hideModal={()=>setShowModal(false)} playlist={playlist} editModal={editModal} setEditModal={setEditModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditPlaylistModal;

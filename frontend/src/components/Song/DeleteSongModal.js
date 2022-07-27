import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteSongAlert from './DeleteSongAlert';


function DeleteSongModal({song,albumId,user}) {
  const [showModal, setShowModal] = useState(false);




  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSongAlert hideModal={()=>setShowModal(false)} song={song} albumId={albumId} user={user}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteSongModal;

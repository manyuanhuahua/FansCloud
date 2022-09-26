import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteSongAlert from './DeleteSongAlert';


function DeleteSongModal({song,albumId,user}) {
  const [showModal, setShowModal] = useState(false);




  return (
    <>
      <i className="fa-solid fa-trash-can" onClick={() => setShowModal(true)} style={{color:'#85794f'}}><span style={{margin:'0 8px', fontSize:'12px'}}>Delete</span></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteSongAlert hideModal={()=>setShowModal(false)} song={song} albumId={albumId} user={user}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteSongModal;

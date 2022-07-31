import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from './EditSongForm';


function EditSongModal({song, showModal, setShowModal}) {
  // const [showModal, setShowModal] = useState(false);




  return (
    <>
      <button className='edit-song-button' onClick={() => {setShowModal(true)}}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSongForm hideModal={()=>setShowModal(false)} song={song}/>
        </Modal>
      )}
    </>
  );
}

export default EditSongModal;

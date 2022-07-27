import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from './EditSongForm';


function EditSongModal({song}) {
  const [showModal, setShowModal] = useState(false);




  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSongForm hideModal={()=>setShowModal(false)} song={song}/>
        </Modal>
      )}
    </>
  );
}

export default EditSongModal;

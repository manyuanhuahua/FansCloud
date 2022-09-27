import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSongForm from './CreateSongForm';


function CreateSongModal({albumId,createModal, setCreateModal}) {
  const [showModal, setShowModal] = useState(false);




  return (
    <div>
    <i className="fa-solid fa-circle-plus" onClick={()=>setShowModal(true)}></i>
    {/* <i class="fa-solid fa-cloud-music" onClick={() => setShowModal(true)}></i> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSongForm hideModal={()=>setShowModal(false)} albumId={albumId} createModal={createModal}  setCreateModal={setCreateModal}/>
        </Modal>
      )}
    </div>
  );
}

export default CreateSongModal;

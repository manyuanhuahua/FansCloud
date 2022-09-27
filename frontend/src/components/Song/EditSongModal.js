import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from './EditSongForm';


function EditSongModal({song, showModal, setShowModal}) {
  // const [showModal, setShowModal] = useState(false);




  return (
    <>
       <i className="fa-solid fa-pen" onClick={() => {setShowModal(true)}} style={{color:'#85794f'}}><span style={{margin:'0 8px', fontSize:'12px'}}>Edit</span></i>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} >
          <EditSongForm hideModal={()=>setShowModal(false)} song={song}/>
        </Modal>
      )}
    </>
  );
}

export default EditSongModal;

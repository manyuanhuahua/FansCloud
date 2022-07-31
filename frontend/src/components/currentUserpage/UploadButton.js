import React, { useState, useEffect } from "react";


import CreateAlbumModal from "../Album/CreateAlbumModal";
import "./currentUser.css"

function UploadBotton({isUpload, setIsUpload}) {
  return (
    <div className='upload-album-modal'>
    <CreateAlbumModal isUpload={isUpload} setIsUpload={setIsUpload}/>
  </div>
  );
}

export default UploadBotton;

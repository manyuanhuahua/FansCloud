import React, { useState, useEffect } from "react";


import CreateAlbumModal from "../Album/CreateAlbumModal";
import "./currentUser.css"

function UploadBotton() {
  return (
    <div class='upload-album-modal'>
    <CreateAlbumModal />
  </div>
  );
}

export default UploadBotton;

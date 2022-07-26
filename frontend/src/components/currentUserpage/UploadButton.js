import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import { NavLink, useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';

import CreateAlbumModal from "../Album/CreateAlbumModal";
import * as songActions from '../../store/song'

function UploadBotton() {
  return (
    <>
    <CreateAlbumModal />
  </>
  );
}

export default UploadBotton;

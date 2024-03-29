import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink} from 'react-router-dom';
import {getUserPlaylistsThunk} from '../../store/playlist'

import "./playlist.css"
import AudioPlayer, { RHAP_UI }  from 'react-h5-audio-player';

import { Modal } from '../../context/Modal';
import CreatePlaylistForm from './CreatePlaylistForm';
import EditPlaylistForm from './EditPlaylistForm';
import DeletePlaylistAlert from './DeletePlaylistAlert';




const PlaylistLists = ()=>{
    const dispatch = useDispatch()
    const playlists = useSelector(state => state.playlists);


    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedSonglist, setSelectedSonglist] = useState([])
    const [currentTrack, setTrackIndex] = useState(0)
    const [showPlayer,setShowPlayer] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selected, setSelected] = useState({})





    useEffect(()=>{
        dispatch(getUserPlaylistsThunk()).then(()=>setIsLoaded(true))
      },[dispatch,editModal,deleteModal])


      const handleClickNext = (songs) => {
          setTrackIndex((currentTrack) =>
              currentTrack < songs.length - 1 ? currentTrack + 1 : 0
          );
      };

      const handleEnd = (songs) => {
        setTrackIndex((currentTrack) =>
                currentTrack < songs.length - 1 ? currentTrack + 1 : 0
            );
      }


      const defaultImg = 'https://cdn.images.express.co.uk/img/dynamic/143/590x/No-Man-s-Sky-gets-alternative-covers-689362.jpg'

      const imgError = (e) =>{
            e.target.src = defaultImg
      }

      return isLoaded && (
        <>
        <div className='current-playlist-main-container'>
            <div className='playlist-top-box'>
            <h2>My playlists</h2>

            <div className='upload-playlist-button' onClick={() => setShowModal(true)} >Create</div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                    <CreatePlaylistForm hideModal={()=>setShowModal(false)} />
                    </Modal>
                )}


        </div>

        <div className='playlist-gallery-box'>
                {Object.values(playlists).map((playlist)=>{
                    return (
                        <div className='current-user-playlists'>
                            <div className='playlist-gallery-left'>
                                <NavLink to={`playlists/${playlist.id}`}>
                                <div key={playlist.id} className='img-box'>
                                    <img className='playlist-content-entry-image' src={playlist.previewImage? playlist.previewImage : defaultImg} onError={imgError}/>
                                </div>
                                </NavLink>
                                    <p style={{marginTop:'3px',marginBottom:'0', textAlign:'center'}}>{playlist.name}</p>

                                <div className='button-group'>
                                <i class="fa-solid fa-headphones"
                                        onClick={()=>{
                                        setSelectedSonglist(playlist.Songs);
                                        setShowPlayer(true)}}
                                        style={{marginRight:"10px"}}

                                    ></i>

                                    <i className="fa-solid fa-pen" onClick={()=>{
                                        setSelected(playlist);
                                        setEditModal(true)}}
                                        style={{marginRight:"10px"}}/>
                                    {editModal && (
                                        <Modal onClose={() => setEditModal(false)}>
                                        <EditPlaylistForm hideModal={()=>setEditModal(false)} playlist={selected} editModal={editModal} setEditModal={setEditModal}/>
                                        </Modal>
                                    )}

                                    <i className="fa-solid fa-trash-can" onClick={()=>{setSelected(playlist);setDeleteModal(true)}} />

                                        {deleteModal && (
                                            <Modal onClose={() => setDeleteModal(false)}>
                                            <DeletePlaylistAlert hideModal={()=>setDeleteModal(false)} playlist={selected} />
                                            </Modal>
                                        )}
                                </div>

                            </div>
                            <div className='playlist-gallery-right'>

                                    {playlist.Songs?.map((song,index)=>{
                                        return (
                                            <div className='playlist-song-list'>
                                                 <NavLink key={song.id} to={`/songs/${song.id}`} style={{textDecoration:'none',color:'#333'}}>

                                                <p>{index+1} - <span>{song.title}</span></p>
                                                 </NavLink>
                                            </div>
                                        )
                                    }
                                    )
                                    }
                        </div>


                    </div>
                    )
                })}
        </div>


    </div>
    {showPlayer && (
        <>

        <AudioPlayer className='playlist-audio-container'
        volume="0.5"
        src={selectedSonglist[currentTrack].audioUrl}
        showSkipControls
        onClickNext={()=>{handleClickNext(selectedSonglist)}}
        onEnded={()=>handleEnd(selectedSonglist)}
        style={{height:'88px'}}
        customAdditionalControls={
            [
            <i class="fa-solid fa-rectangle-xmark" style={{marginRight:'20px'}} onClick={()=>setShowPlayer(false)}><span style={{marginLeft:"10px", fontSize:"14px",color:"#333"}}>Close</span></i>,
            RHAP_UI.LOOP,
            <div className='playlist-audio-player'>
                <img src={selectedSonglist[currentTrack].previewImage} className='audio-player-song-img'/>
                <p style={{marginLeft:'30px'}}>{selectedSonglist[currentTrack].title}</p>

            </div>

            ]
          }
        />
        </>)}
    </>

      )
    }
export default PlaylistLists;

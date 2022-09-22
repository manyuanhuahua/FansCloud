import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getUserPlaylistsThunk} from '../../store/playlist'

import "./playlist.css"
import AudioPlayer, { RHAP_UI }  from 'react-h5-audio-player';

import { Modal } from '../../context/Modal';
import CreatePlaylistForm from './CreatePlaylistForm';
import DeletePlaylistModal from './DeletePlaylistModal';
import EditPlaylistModal from './EditPlaylistModal';


const PlaylistLists = ()=>{
    const dispatch = useDispatch()
    const playlists = useSelector(state => state.playlists);
    const songList = useSelector(state => state.songs);
    const sessionUser = useSelector(state => state.session.user);

    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedSonglist, setSelectedSonglist] = useState([])
    const [currentTrack, setTrackIndex] = useState(0)
    const [showPlayer,setShowPlayer] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);


    console.log('playlist-0----',isLoaded)


    useEffect(()=>{
        dispatch(getUserPlaylistsThunk()).then(()=>setIsLoaded(true))
      },[dispatch])


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

      return isLoaded && (
        <>
        <div className='current-playlist-main-container'>
            <div className='playlist-top-box'>
            <h2>My playlists</h2>
            <div className='upload-album-button'>
            <button onClick={() => setShowModal(true)}>Upload</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                    <CreatePlaylistForm hideModal={()=>setShowModal(false)} />
                    </Modal>
                )}

            </div>
        </div>
          {/* <p>this is current user page</p> */}
        <div className='playlist-gallery-box'>
                {playlists.map((playlist)=>{
                    return (
                        <div className='current-user-playlists'>
                            <div className='playlist-gallery-left'>
                                <div key={playlist.id} className='img-box'>
                                    <img className='playlist-content-entry-image' src={playlist.previewImage} />
                                </div>
                                    <p style={{marginTop:'3px',marginBottom:'0'}}>{playlist.name}</p>
                                <div className='button-group'>
                                    <button onClick={()=>{
                                        setSelectedSonglist(playlist.Songs);
                                        setShowPlayer(true)
                                    }}>Listen</button>
                                    <EditPlaylistModal playlist={playlist} editModal={editModal} setEditModal={setEditModal}/>
                                    <DeletePlaylistModal playlist={playlist}/>
                                </div>

                            </div>
                            <div className='playlist-gallery-right'>

                                    {playlist.Songs?.map((song,index)=>{
                                        return (
                                            <div className='playlist-song-list'>
                                                 <NavLink key={song.id} to={`/songs/${song.id}`} style={{textDecoration:'none',color:'#333'}}>

                                                <p>{index} - <span>{song.title}</span></p>
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
    {showPlayer && (<AudioPlayer className='playlist-audio-container'
        volume="0.5"
        src={selectedSonglist[currentTrack].audioUrl}
        showSkipControls
        onClickNext={()=>{handleClickNext(selectedSonglist)}}
        onEnded={()=>handleEnd(selectedSonglist)}
        style={{height:'88px'}}
        customAdditionalControls={
            [
            RHAP_UI.LOOP,
            <div className='playlist-audio-player'>
                <img src={selectedSonglist[currentTrack].previewImage} className='audio-player-song-img'/>
                <p style={{marginLeft:'30px'}}>{selectedSonglist[currentTrack].title}</p>
            </div>
            ]
          }
        />)}
    </>
      )
    }
export default PlaylistLists;

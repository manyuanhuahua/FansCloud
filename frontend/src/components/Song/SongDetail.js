import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'
import MainAudioPlayer from '../AudioPlayer/MainAudio';
import DeleteSong from './DeleteSongAlert';
import DeleteSongModal from './DeleteSongModal';
import EditSongModal from './EditSongModal';
import { Modal } from '../../context/Modal';
import AddSongToPlaylistForm from './AddSongToPlaylist';
import "./song.css"


const SongDetail = ()=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const {songId} = useParams()
    const song = useSelector(state => state.songs);
    const sessionUser = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false);
  const [songPlaylistModal, setSongPlaylistModal] = useState(false)





    ;

    const [isLoaded, setIsLoaded] = useState(false)

   

      useEffect(()=>{
        dispatch(songActions.getSongDetail(songId))
                .then(()=>{
                    setIsLoaded(true)
        })
      },[dispatch,songId,showModal])

      const rotate = ()=>{
        const disk = document.querySelector('.disk')
        disk.classList.toggle('play')
      }


      return isLoaded && (



                <div className='song-detail-entry' key={song.id}>
                    <div className='song-detail-music-player'>
                        <div style={{textAlign:'left',margin:'0',cursor:'pointer',color:'#5a5c5b'}} onClick={()=>history.goBack()}>← Back</div>
                        <h2 className='song-title'>{song.title}</h2>
                        <p className='artist-name'>{song.Artist.username}</p>
                        <div className='disk' style={{backgroundImage:`url(${song.previewImage})`}}>
                        </div>
                            {/* <img className='cover-img'src={song.previewImage} /> */}
                    <div className='song-create-time'>
                    {sessionUser && (
                      <i class="fa-solid fa-circle-plus" onClick={()=>setSongPlaylistModal(true)} style={{color:'#85794f'}}>
                        <span style={{margin:'0 8px', fontSize:'12px'}}>Add To Playlist</span>
                      </i>)}
                          {songPlaylistModal && (
                                    <Modal onClose={() => setSongPlaylistModal(false)}>
                                      <AddSongToPlaylistForm hideModal={()=>setSongPlaylistModal(false)} songPlaylistModal={songPlaylistModal}  setSongPlaylistModal={setSongPlaylistModal} />
                                    </Modal>
                          )}
                    {(sessionUser?.id === song.userId) ? (
                        <>
                            <EditSongModal song={song} showModal={showModal} setShowModal={setShowModal}/>
                            <DeleteSongModal song={song} albumId={song.albumId} user={sessionUser}/>


                        </>
                    ):<></>}

                    </div>
                    <div className='song-detail-player'>
                        <MainAudioPlayer song={song} rotate={rotate}/>
                    </div>
                    </div>
                </div>



      )

}

export default SongDetail;

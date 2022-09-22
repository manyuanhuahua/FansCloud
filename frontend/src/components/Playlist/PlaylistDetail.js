import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams } from 'react-router-dom';
import {getPlaylistDetailThunk} from '../../store/playlist'
import CreateSongModal from '../Song/CreateSongModal';
import AudioPlayer from 'react-h5-audio-player';




const PlaylistDetail = ()=>{
    const dispatch = useDispatch()
    const {playlistId} = useParams()
    const playlistObj = useSelector(state => state.playlists);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);


    const [isLoaded, setIsLoaded] = useState(false)
    const [songLoaded, setSongLoaded] = useState(false)


    useEffect(()=>{
        dispatch(getPlaylistDetailThunk(playlistId)).then(()=>setIsLoaded(true))
    },[dispatch,playlistId])

    const playlist = Object.values(playlistObj)[0]



      return isLoaded && playlist &&(

            //top banner
            <div className='playlist-detail'>
                <div className='playlist-top-box'>
                    <div className='top-box-left'>
                            <div className='left-top'>
                                <div className='img-cropper'>
                                    <img className='player-img' src={playlist.previewImage} />
                                </div>
                                <div className='text'>
                                    <span className='detial-title'>{playlist.name}</span>
                                    <span className='detail-creator'><Link to="/currentUser">{playlist.user.username}</Link></span>
                                </div>

                            </div>
                            <div className='left-bottom'>
                                <div>{playlist.trackNum} TRACK</div>
                            </div>
                    </div>
                    <div className='top-box-right'>
                            <img className='playlist-cover' src={playlist.previewImage}/>
                    </div>

                </div>

                <div className='mid-box'>

                     {/* <EditAlbumModal album={album} editModal={editModal} setEditModal={setEditModal}/>
                        <span>Edit Album</span>
                     <DeleteAlbumModal album={album} />
                     <span>Delete Album</span> */}

                     {/* <CreateSongModal albumId={album.id} createModal={createModal} setCreateModal={setCreateModal}/> */}
                     <span>Add Songs</span>

                </div>

                <div className='content-container'>
                    <div className='center-box'>

                    <div className='content-left'>
                        <img className='user-profile' src={playlist.user.previewImage}></img>
                        <span>{playlist.user.username}</span>

                    </div>
                     <div className='songsContainer'>
                     {playlist.songs.map((song, index)=>{
                            return (
                                <div className='menu-song' key={song.id}>
                                        <div className='img-box'>
                                            <img className='song-img' src={song.previewImage}/>
                                        </div>
                                        <div className='song-text'>
                                        <span>{index+1}</span>
                                            <Link className='detial-title' to={`/songs/${song.id}`}>{song.title}-<span className='song-subtitle'></span></Link>
                                            {/* <div onClick={()=>setIsPlay(!isPlay)}><i class="fa-solid fa-circle-play" id={index} /></div> */}
                                        </div>


                                        <div className='songlist-audioPlayer'>
                                        <AudioPlayer
                                                autoPlay={false}
                                                src={song.audioUrl}
                                                layout='horizontal'
                                                customAdditionalControls={[]}
                                        />
                                        </div>

                                        {/* <MainAudioPlayer song={song}/> */}
                                </div>
                            )
                        })}

                    </div>
                    </div>
                </div>
                 <div>
                 </div>

            </div>

      )

}

export default PlaylistDetail;

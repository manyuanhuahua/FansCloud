import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import * as songActions from '../../store/song'
import {getallbums} from "../../store/album"
import {getPlaylistsThunk } from "../../store/playlist"
import Carousel from 'nuka-carousel';
import "./explorer.css"


const Explore = ()=>{
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const songs = useSelector(state => state.songs);
    const albums = useSelector(state => state.albums);
    const playlists = useSelector(state => state.playlists);


    const [isLoaded, setIsLoaded] = useState(false)



    useEffect(()=>{
        dispatch(songActions.getSong())
        dispatch(getallbums())
        dispatch(getPlaylistsThunk())
        .then(()=>

        setIsLoaded(true))
      },[dispatch])

      const albumDefault = 'https://i.pinimg.com/236x/8a/b8/7b/8ab87bd6999d659eb282fbed00895d86--last-fm-album-cover.jpg'

      const songDefault = 'https://i.pinimg.com/originals/68/ab/e8/68abe86ae24e398c5a902848f4c87c86.jpg'
      const playlistDefault = 'https://kapundahigh.weebly.com/uploads/6/1/5/4/61545621/604875677.jpg'

      return  isLoaded && (
          <div className='explore-main-container' >
            <div className='explore-content-container'>
                <h2 >New Albums You Should Know</h2>
                <Carousel wrapAround={true} slidesToShow={5} dragging={true} cellSpacing={10}>
                    {[...albums].sort(() => 0.5 - Math.random()).slice(0,10).map((album,index)=>(
                        <>
                        <NavLink to={`/albums/${album.id}`} key={index}>
                            <img
                            src={album.previewImage? album.previewImage : albumDefault}
                            onError={(e) => e.target.src = albumDefault}
                             style={{backgroundImage:'https://i.pinimg.com/236x/8a/b8/7b/8ab87bd6999d659eb282fbed00895d86--last-fm-album-cover.jpg',width:'180px',height:'180px',padding:'5px 18px 0 18px'}}/>
                        </NavLink>
                            <p style={{paddingBottom:'25px',textAlign:'center',letterSpacing:'0.5px',color:'#333', textTransform:'capitalize',wordWrap:'break-word',width:'180px',margin:'auto',height:'40px'}}>{album.title}</p>

                            </>)
                    )}
                </Carousel>
            </div>
            <div className='explore-content-container'>
                <h2>Popular Playlists</h2>
                <Carousel wrapAround={true} slidesToShow={5} dragging={true} className='slider-container'>
                    {[...Object.values(playlists)].sort(() => 0.5 - Math.random()).slice(0,10).map((playlist,index)=>(
                        <>
                         <NavLink to={`/playlists/${playlist.id}`} key={index}>
                            <img
                            src={playlist.previewImage? playlist.previewImage : albumDefault}
                            onError={(e) => e.target.src = playlistDefault}
                            style={{width:'180px',height:'180px',padding:'5px 18px 0 18px',backgroundImage:'https://kapundahigh.weebly.com/uploads/6/1/5/4/61545621/604875677.jpg'}}/>
                        </NavLink>
                         <p style={{paddingBottom:'25px',textAlign:'center',letterSpacing:'0.5px',color:'#333',textTransform:'capitalize',wordWrap:'break-word',width:'180px',margin:'auto',height:'40px'}}>{playlist.name}</p>
                         </>)
                    )}
                </Carousel>
            </div>
            <div className='explore-content-container'>
                <h2>FansCloud Exclusives Songs</h2>
                <Carousel wrapAround={true} slidesToShow={5} dragging={true} className='slider-container'>
                    {[...songs].sort(() => 0.5 - Math.random()).slice(0,10).map((song,index)=>(
                        <>
                        <NavLink to={`/songs/${song.id}`} key={index}>
                            <img
                                src={song.previewImage}
                                onError={(e) => e.target.src = songDefault}
                                style={{width:'180px',height:'180px',padding:'5px 18px 0 18px',backgroundImage:'https://i.pinimg.com/originals/68/ab/e8/68abe86ae24e398c5a902848f4c87c86.jpg'}}/>
                        </NavLink>
                        <p style={{paddingBottom:'25px',textAlign:'center',letterSpacing:'0.5px',color:'#333',wordWrap:'break-word',width:'180px',margin:'auto',textTransform:'capitalize',height:'40px'}}>{song.title}</p>
                        </>
                        )
                    )}
                </Carousel>
            </div>
            {/* <div className='explore-content-container'>
                <h2>Fresh Pressed</h2>
                <Carousel wrapAround={true} slidesToShow={5} dragging={true}>
                    {[...s].sort(() => 0.5 - Math.random()).slice(0,10).map((album)=>(
                            <img src={album.previewImage} style={{width:'150px',height:'150px',padding:'0 18px 30px 18px'}}/>
                        )
                    )}
                </Carousel>
            </div> */}
        </div>

      )


}

export default Explore;

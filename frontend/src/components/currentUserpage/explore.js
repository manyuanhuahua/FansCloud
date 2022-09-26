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


      return  isLoaded && (
          <div className='explore-main-container' >
            <div className='explore-content-container'>
                <h2>New Albums You Should Know</h2>
                <Carousel wrapAround={true} slidesToShow={5} dragging={true} cellSpacing={10}>
                    {[...albums].sort(() => 0.5 - Math.random()).slice(0,10).map((album)=>(
                        <NavLink to={`/albums/${album.id}`} >
                            <img src={album.previewImage} style={{width:'180px',height:'180px',padding:'0 18px 30px 18px'}}/>
                        </NavLink>
                        )
                    )}
                </Carousel>
            </div>
            {/* <div className='explore-content-container'>
                <h2>Popular Playlists</h2>
                <Carousel wrapAround={true} slidesToShow={5} dragging={true} className='slider-container'>
                    {[...Object.values(playlists)].sort(() => 0.5 - Math.random()).slice(0,10).map((playlist)=>(
                         <NavLink to={`/playlists/${playlist.id}`} >
                            <img src={playlist.previewImage} style={{width:'150px',height:'150px',padding:'0 18px 30px 18px'}}/>
                        </NavLink>
                        )
                    )}
                </Carousel>
            </div> */}
            <div className='explore-content-container'>
                <h2>FansCloud Exclusives Songs</h2>
                <Carousel wrapAround={true} slidesToShow={5} dragging={true} className='slider-container'>
                    {[...songs].sort(() => 0.5 - Math.random()).slice(0,10).map((song)=>(
                        <NavLink to={`/songs/${song.id}`} >
                            <img src={song.previewImage} style={{width:'180px',height:'180px',padding:'0 18px 30px 25px'}}/>
                        </NavLink>
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

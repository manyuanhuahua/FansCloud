import React from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


function MainAudioPlayer({song,rotate}) {


    return (
     <AudioPlayer
      autoPlay={false}
      src={song.audioUrl}
      onPlay={() => rotate()}
      onPause={()=>rotate()}
  
      />
  );
}

export default MainAudioPlayer;

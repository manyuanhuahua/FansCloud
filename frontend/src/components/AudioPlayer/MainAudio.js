import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


function MainAudioPlayer({song,rotate}) {
    // const [isPlay, setIsPlay] = useState(false)

    return (
     <AudioPlayer
      autoPlay={false}
      src={song.audioUrl}
      onPlay={() => rotate()}
      onPause={()=>rotate()}
      // other props here
      />
  );
}

export default MainAudioPlayer;

import React, { useState, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


function MainAudioPlayer({song}) {
    // const [isPlay, setIsPlay] = useState(false)

    return (
     <AudioPlayer
      autoPlay={false}
      src={song.audioUrl}
    //   onPlay={e => console.log("onPlay")}
      // other props here
      />
  );
}

export default MainAudioPlayer;

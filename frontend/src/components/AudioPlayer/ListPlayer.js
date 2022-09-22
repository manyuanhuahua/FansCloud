
import React, { useEffect, useRef, useState } from 'react'

import WaveSurfer from "wavesurfer.js";

import AudioPlayer, { RHAP_UI }  from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';



const formWaveSurferOptions = ref => ({
  container: ref,
  waveColor: "#e1dbcd",
  progressColor: "#9d2933",
  cursorColor: "#85794f",
  barWidth: 2,
  barRadius: 3,
  responsive: true,
  height: 50,

  normalize: true,

  partialRender: true,
  xhr: {
    cache: "default",
    mode: "cors",
    method: "GET",
    credentials: "include",
    headers: [
      { key: "cache-control", value: "no-cache" },
      { key: "pragma", value: "no-cache" }
    ]
  }

});



const ListPlayer = ({ audio }) => {
  // const url = "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3"
  // const url = audio
  const url = 'https://mp3.filmisongs.com/go.php?id=Bang%20Bang%20Song%20Download%20Mp3%20Jessie%20J%20Ft%20Ariana%20Grande,%20Nicki%20Minaj.mp3'



  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [play, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);




  // const handlePositionChange = (position) => { /* ... */ };
  // const onReadyHandler = () => console.log('done loading!');

  // const handlePlay = () => {
  //   setPlay(!play);
  //   waveform.playPause();
  // };

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function() {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [url]);



  return (
      <div>

      <div className="controls" style={ {display:'flex',width:'100%',alignItems:'center',justifyContent:'center'}}>
        <AudioPlayer
          autoPlay={false}
          src={url}
          onPlay={()=>{setPlay(true);
            wavesurfer.current.playPause()}}
          onPause={()=>{
            setPlay(false);
            wavesurfer.current.playPause()
          }}
          layout="horizontal-reverse"
          customProgressBarSection={
            [
              RHAP_UI.CURRENT_TIME,
              <div>/</div>,
              RHAP_UI.DURATION
            ]
          }
          style={{
            width: '270px',
            border:'none',
            boxShadow:'none'
          }}

          showJumpControls={false}
          customAdditionalControls={[]}
          // other props here
          />
        <div id="waveform" ref={waveformRef} style={{width:'100%'}}/>
        </div>
      </div>
    );

}

// Waveform.propTypes = {
//   audio: PropTypes.string.isRequired,
// }

export default ListPlayer

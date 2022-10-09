import React, { useState } from "react";



function ToggleButton(props) {
//   const { isPlay, setIsPlayer } = useState(false)

  return (
    <div className={props.isPlay ? 'fab is-play' : 'fab'} onClick={props.onClick}>
      {props.isPlay ? <i className="fa-solid fa-toggle-large-on" />
      : <i className="fa-solid fa-toggle-large-off" />
      }
    </div>
  );
}

export default ToggleButton;

import React from "react";
import SoundCloudPlayer from 'react-player/lib/players/SoundCloud';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faFastBackward } from '@fortawesome/free-solid-svg-icons';
import { faFastForward } from '@fortawesome/free-solid-svg-icons';

import './Player.css';


const Player = (props) => {
  return (
    <div className="player-container">
      <SoundCloudPlayer
        width="100%"
        className='react-player'
        url="https://soundcloud.com/tsimashei/s3q1t3aejgsz"
      />
      <div className="player-buttons">
        <div className="control-btn">
          <FontAwesomeIcon
            icon={faFastBackward}
            color="white"
            size="2x"
          />
        </div>
        <div className="control-btn">
          <FontAwesomeIcon
            icon={faPlay}
            color="white"
            size="2x"
          />
        </div>
        <div className="control-btn">
          <FontAwesomeIcon
            icon={faFastForward}
            color="white"
            size="2x"
          />
        </div>
      </div>
    </div>
  );
}

export default Player;

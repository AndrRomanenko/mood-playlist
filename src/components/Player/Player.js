import React from "react";
import SoundCloudPlayer from 'react-player/lib/players/SoundCloud';


const Player = (props) => {
  return (
    <div className="player-container">
      <SoundCloudPlayer
        className='react-player'
        url='https://soundcloud.com/tsimashei/malyy-povzroslel-fetre-prod'
      />
      <div className="player-buttons">
        БУТТОНС!
      </div>
    </div>
  );
}

export default Player;

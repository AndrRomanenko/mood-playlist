import React from "react";
import SoundCloudPlayer from 'react-player/lib/players/SoundCloud';


const Player = (props) => {
  return (
    <SoundCloudPlayer
      className='react-player'
      url='https://soundcloud.com/tsimashei/malyy-povzroslel-fetre-prod'
    />
  );
}

export default Player;

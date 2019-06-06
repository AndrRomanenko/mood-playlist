import React from "react";
import './Playlist.css';

const Playlist = (props) => {

  const { tracks } = props;
  return (
    <React.Fragment>
      <div className="row-container pl-header">
        <div className="track-col">Track</div>
        <div className="link-col">Soundcloud</div>
      </div>
      {
        tracks.map((obj) => {
          return (
            <div className="row-container">
              <div className="track-col">{obj.name}</div>
              <div className="link-col">
                <div className="button">
                  <a href={obj.link}>Go</a>
                </div>
              </div>
            </div>
          );
        })
      }
    </React.Fragment>
  );
}

export default Playlist;

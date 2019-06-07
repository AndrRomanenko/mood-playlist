import React, { Component } from 'react'

import Results from '../Results';
import Camera from '../Camera';
import Message from '../Message';
import Player from '../Player';
import Playlist from '../Playlist';

import { FaceFinder } from '../../ml/face'
import { EmotionNet } from '../../ml/models'
import { nextFrame } from '../../util'
import { tracks } from './app.helper';

import './App.css';

class App extends Component {
  state = {
    ready: false,
    loading: false,
    imgUrl: '',
    detections: [],
    faces: [],
    emotions: []
  };

  componentDidMount() {
    this.initModels();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  initModels = async () => {
    const faceModel = new FaceFinder();
    await faceModel.load();

    const emotionModel = new EmotionNet();
    await emotionModel.load();

    this.models = { face: faceModel, emotion: emotionModel };
    this.setState({ ready: true }, this.initPredict);
  };

  initPredict = () => {
    if (!this.img || !this.img.complete) return;
    this.setState({ loading: true });
    this.analyzeFaces();
  };

  handleImgLoaded = () => {
    this.analyzeFaces();
  };

  analyzeFaces = async () => {
    await nextFrame();

    if (!this.models) return;

    const faceResults = await this.models.face.findAndExtractFaces(this.img);
    const { detections, faces } = faceResults;

    let emotions = await Promise.all(
      faces.map(async face => await this.models.emotion.classify(face))
    );

    this.setState(
      { loading: false, detections, faces, emotions },
    );
  };

  setWebcamPic = (pic) => {
    this.setState({ imgUrl: pic });
    this.analyzeFaces();
  };

  render() {
    const { ready, imgUrl, loading, faces, emotions } = this.state;
    const noFaces = ready && !loading && imgUrl && !faces.length;

    return (
      <React.Fragment>

        <div className='content-container'>

          <div className="section card playlist">
            <Playlist tracks={tracks} />
          </div>

          <div className="section card camera">
            <Camera onCapture={this.setWebcamPic} />
          </div>

          <div className="section card player">
            <Player />
          </div>
        </div>

        <div className="content-container">
          <div className="section card results">

            {!ready && "Loading machine learning models.."}
            {loading && "Analyzing image..."}

            {noFaces && (
              <Message bg="red" color="white">
                <strong>Sorry!</strong> Poor quality or no faces were detected. Please try to take closer shot
            </Message>
            )}

            {faces.length > 0 && <Results faces={faces} emotions={emotions} />}
            {imgUrl && (
              <div className='some'>
                <img
                  ref={el => (this.img = el)}
                  onLoad={this.handleImgLoaded}
                  src={imgUrl}
                  alt=""
                />
                <canvas
                  ref={el => (this.canvas = el)}
                  className="absolute top-0 left-0"
                />
              </div>
            )}
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default App;

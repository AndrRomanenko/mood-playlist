import debounce from 'lodash.debounce'
import React, { Component } from 'react'

import Results from '../Results';
import Camera from '../Camera';
import Message from '../Message';
import Player from '../Player';

import { FaceFinder } from '../../ml/face'
import { EmotionNet } from '../../ml/models'
import { nextFrame } from '../../util'

import styles from './app.module.css';

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
      <div className="px2 mx-auto container app">
        <main>
          <div className="py1">
            <Camera onCapture={this.setWebcamPic}/>
          </div>
          {noFaces && (
            <Message bg="red" color="white">
              <strong>Sorry!</strong> Poor quality or no faces were detected. Please try to take closer shot
            </Message>
          )}
          {faces.length > 0 && <Results faces={faces} emotions={emotions} />}
          {imgUrl && (
            <div className={styles.hided}>
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
          {!ready && "Loading machine learning models.."}
          {loading && "Analyzing image..."}
          <Player />
        </main>
      </div>
    );
  }
}

export default App;

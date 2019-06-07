import React from "react";
import Webcam from "react-webcam";
import './Camera.css';


const Camera = (props) => {

  const { onCapture } = props;

  const setRef = webcam => {
    this.webcam = webcam;
  };

  const capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    onCapture(imageSrc);
  };

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
    screenshotQuality: 1,
  };

  return (
    <div className="cam-container">
      <Webcam
        audio={false}
        ref={setRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button
        className="c-button"
        onClick={capture}>Get emotion!</button>
    </div>
  );
}

export default Camera;

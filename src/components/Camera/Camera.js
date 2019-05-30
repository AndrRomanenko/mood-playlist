import React from "react";
import Webcam from "react-webcam";


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
    facingMode: "user"
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={setRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Get emotion!</button>
    </div>
  );
}

export default Camera;

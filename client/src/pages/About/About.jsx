import React, { useRef, useEffect } from "react";
import "./About.css";
import sampleVideo from "../../assets/sample-video.mp4";

const About = () => {
  const videoRef = useRef(null);
  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  const handleRightDoubleClick = () => {
    console.log("hello");
    videoRef.current.currentTime += 10;
  };
  const handleLeftDoubleClick = () => {
    videoRef.current.currentTime -= 5;
  };

  useEffect(() => {
    let interval1;
    let interval2;
    const leftVideoElement = document.getElementById("leftDiv");
    const rightVideoElement = document.getElementById("rightDiv");
    rightVideoElement.addEventListener("mousedown", () => {
      interval1 = setInterval(() => {
        console.log("hello");
        videoRef.current.playbackRate = 2;
      }, 100);
    });
    rightVideoElement.addEventListener("mouseup", () => {
      clearInterval(interval1);
      videoRef.current.playbackRate = 1.0;
    });
    leftVideoElement.addEventListener("mousedown", () => {
      interval2 = setInterval(() => {
        videoRef.current.currentTime -= 1;
      }, 100);
    });
    leftVideoElement.addEventListener("mouseup", () => {
      clearInterval(interval2);
      videoRef.current.playbackRate = 1.0;
    });
  }, []);

  return (
    <div className="about-container">
      <div className="about-container-1">
        <div className="innerContainer-1">
          <video id="video" ref={videoRef} controls controlsList="nofullscreen">
            <source src={sampleVideo} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </div>
        <div
          className="innerContainer-2"
          style={{ display: "flex", zIndex: "9999" }}
        >
          <div
            id="leftDiv"
            onDoubleClick={() => handleLeftDoubleClick()}
            style={{ display: "flex", width: "33%" }}
          ></div>
          <div
            onDoubleClick={() => handlePlayPause()}
            style={{ display: "flex", width: "33%" }}
          ></div>
          <div
            id="rightDiv"
            onDoubleClick={() => handleRightDoubleClick()}
            style={{ display: "flex", width: "33%" }}
          ></div>
        </div>
      </div>

      <div className="about-container-2">
        <div className="content1">Who we are</div>
        <h1>Empowering the world to develop technology through collective knowledge.</h1>
        <p>Our public platform serves millions of people every month, making it one of the most popular websites in the world.</p>
        <p>Our asynchronous knowledge management and collaboration offering, Stack Overflow for Teams, is transforming how people work.</p>
      </div>
    </div>
  );
};

export default About;

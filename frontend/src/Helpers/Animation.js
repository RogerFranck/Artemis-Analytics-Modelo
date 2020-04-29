import React, { Component } from "react";
import Lottie from "react-lottie";
import animationData from "../Components/Assets/animation.json";
import "../App.css";
class animation extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
       rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }
}

export default animation;
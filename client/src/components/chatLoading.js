import React from "react";
import loadingAnimation from "./animations/chatloading.json";
import Lottie from "react-lottie";

export function ChatLoading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%", // Adjust width as needed
          height: "100%", // Adjust height as needed
          backgroundColor: "rgba(255, 255, 255, 0.6)", // Optional background
          zIndex: 999,
          pointerEvents: "none", // Prevent interaction while loading
        }}
      >
        <Lottie options={defaultOptions} height={200} width={200} />{" "}
        {/* Set specific height/width */}
      </div>
    </>
  );
}

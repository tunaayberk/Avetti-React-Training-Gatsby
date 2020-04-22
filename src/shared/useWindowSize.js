import { useState, useEffect } from "react";

const MobileResolution = 768;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function isMobile(width) {
  return width <= MobileResolution ? true : false;
}

export default function useWindowSize() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [mobileState, setMobileState] = useState(
    isMobile(windowDimensions.width)
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      setMobileState(isMobile(getWindowDimensions().width));
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { windowDimensions, mobileState };
}

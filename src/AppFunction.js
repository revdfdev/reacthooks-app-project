import React, { useState, useEffect } from "react";

const initialLocationState = {
  latitude: null,
  longitude: null,
  speed: null
};

const App = () => {
  const [count, setCount] = useState(0);
  const [isOn, changeLight] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  const [{ latitude, longitude, speed }, setLocation] = useState(
    initialLocationState
  );
  let mounted = true;

  useEffect(
    () => {
      document.title = `You have clicked ${count} times`;
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      navigator.geolocation.getCurrentPosition(handleGeoLocation);
      const watchId = navigator.geolocation.watchPosition(handleGeoLocation);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
        navigator.geolocation.clearWatch(watchId);
        mounted = false;
      };
    },
    [count]
  );

  const handleGeoLocation = event => {
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed
      });
    }
  };

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

  const handleMouseMove = event => {
    setMousePosition({
      x: event.pageX,
      y: event.pageY
    });
  };

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleLight = () => {
    changeLight(isOn => !isOn);
  };

  return (
    <>
      <button onClick={incrementCount}>I was clicked {count} times</button>
      <h2>Toggle Light</h2>
      <img
        src={
          isOn
            ? "https://icon.now.sh/highlight/fd0"
            : "https://icon.now.sh/highlight/aaa"
        }
        alt="FlashLight"
        style={{ width: "50px", height: "50px", cursor: "pointer" }}
        onClick={toggleLight}
      />

      <h2>Mouse position</h2>
      {JSON.stringify(mousePosition, null, 3)}
      <br />

      <h2>Network status</h2>
      <p>
        You are <strong>{status ? "online" : "offline"}</strong>
      </p>

      <h2>Geo Location</h2>
      <p>Latitude is {latitude}</p>
      <p>Longitude is {longitude}</p>
      <p>Your speed is {speed ? speed : "0"}</p>
    </>
  );
};

export default App;

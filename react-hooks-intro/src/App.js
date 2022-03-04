import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [position, setPosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  const [{ latitude, longitude, speed }, setLocation] = useState({
    latitude: null,
    longitude: null,
    speed: null,
  });
  let mounted = true;

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const toggleLight = () => {
    setIsOn((prevCount) => !prevCount);
  };

  const handleMouseMove = (event) => {
    setPosition({
      x: event.pageX,
      y: event.pageY,
    });
  };
  useEffect(() => {
    document.title = `You've been clicked ${count} times`;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("online", handleEventOnline);
    window.addEventListener("offline", handleEventOffline);
    navigator.geolocation.getCurrentPosition(handleGeoLocation);
    const watchId = navigator.geolocation.watchPosition(handleGeoLocation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("online", handleEventOnline);
      window.removeEventListener("offline", handleEventOffline);
      navigator.geolocation.clearWatch(watchId);
      mounted = false;
    };
  }, [count]);

  const handleGeoLocation = (event) => {
    if (mounted) {
      setLocation({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
      });
    }
  };
  const handleEventOnline = () => setStatus(true);
  const handleEventOffline = () => setStatus(false);

  return (
    <>
      <h2>Counter</h2>
      <button onClick={incrementCount}>I am clicked {count} times</button>
      <h2>Toggle Light</h2>
      <img
        src={isOn ? "/images/flash-on.png" : "/images/flash-off.png"}
        style={{
          height: "50px",
          width: "50px",
        }}
        alt="Flash Light"
        onClick={toggleLight}
      ></img>
      <div>{JSON.stringify(position)}</div>
      <h2>Network Status</h2>
      <p>
        You are <strong>{status ? "Online" : "Offline"}</strong>
      </p>
      <h2>Geo Location</h2>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>Speed: {speed ? speed : "0"}</p>
    </>
  );
}

export default App;

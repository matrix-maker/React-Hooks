import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const toggleLight = () => {
    setIsOn((prevCount) => !prevCount);
  };
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
    </>
  );
}

export default App;

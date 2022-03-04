import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitClick = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <form action="" className="loginForm">
        <input
          className="formInput"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
        <input
          className="formInput"
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        <button onClick={onSubmitClick} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

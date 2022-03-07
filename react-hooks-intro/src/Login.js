import { useState } from "react";
import "./Login.css";

const initialState = {
  username: "",
  password: "",
  email: "",
};

export default function Login() {
  const [form, setForm] = useState(initialState);
  const [user, setUser] = useState(null);

  const handleOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    console.log(JSON.stringify(form));
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    setUser(form);
    setForm(initialState);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <form action="" className="loginForm">
        <input
          className="formInput"
          type="text"
          name="username"
          value={form.username}
          onChange={handleOnChange}
          placeholder="Username"
        />
        <input
          className="formInput"
          type="text"
          name="email"
          value={form.email}
          onChange={handleOnChange}
          placeholder="Email"
        />
        <input
          className="formInput"
          type="password"
          name="password"
          value={form.password}
          onChange={handleOnChange}
          placeholder="Password"
        />
        <button onClick={onSubmitClick} type="submit">
          Submit
        </button>
      </form>
      {user && JSON.stringify(user)}
    </div>
  );
}

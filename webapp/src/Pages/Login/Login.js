import { useState } from "react";
import "./Login.css";

import TextField from "@mui/material/TextField";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppButton } from "../../UI/Button/Button";

export const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState('');

  const navigation = useNavigate();


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `http://localhost:3001/api/login`,
        user,
        {
          headers: { Accept: 'application/json' }
        })
      .then(response => {
        localStorage.setItem('access_token', response?.data?.token);
        localStorage.setItem('access_lvl', response?.data?.role);
        navigation('/');
      })
      .catch(err => {
        setError(err.response.data.message)
        setTimeout(() => { setError("") }, 2000)
      })
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-title">Log into my account</div>
      <form onSubmit={onSubmitHandler}>
        <div className="login-input-div">
          <TextField
            id="user-email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            label="Email"
            size="small"
            className="login-input"
            required
          />
        </div>
        <div className="login-input-div">
          <TextField
            id="user-password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            label="Password"
            size="small"
            className="login-input"
            required
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <AppButton
            type="submit"
            className="primary-button"
            variant="text"
            text="Log in"
          />
        </div>
      </form>

      <div style={{ fontSize: 14, paddingTop: 12 }}>
        <Link to='/signup'>Create a new account?</Link>
      </div>


      <div className="error-text">
        {error}
      </div>
    </div>
  );
};

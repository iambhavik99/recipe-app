import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppButton } from "../../UI/Button/Button";

export const Signup = () => {
    const [user, setUser] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState('');

    const navigation = useNavigate();


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        await axios
            .post(
                `http://localhost:3001/api/register`,
                user,
                {
                    headers: { Accept: 'application/json' }
                })
            .then(response => {
                navigation('/login');
            })
            .catch(err => {
                setError(err.response.data.message)
                setTimeout(() => { setError("") }, 2000)
            })
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-title">Create a new account</div>
            <form onSubmit={onSubmitHandler}>
                <div className="login-input-div">
                    <TextField
                        id="user-name"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        label="Username"
                        size="small"
                        className="login-input"
                        required
                    />
                </div>
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
                        text="Sign up"
                    />
                </div>
            </form>

            <div style={{ fontSize: 14, paddingTop: 12 }}>
                <Link to='/login'>Already have account?</Link>
            </div>

            <div className="error-text">
                {error}
            </div>
        </div>
    );
}
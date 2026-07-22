import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import axios from "axios"

import { AuthContext } from "../AuthContext"

export default function Login() {
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const { setUser, setIsLoggedIn } = useContext(AuthContext);
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if(!loginData.username.trim()) {
            setMsg("");
            newErrors.username = "Username is required";
        }

        if(!loginData.password.trim()) {
            setMsg("");
            newErrors.password = "Password is required";
        }

        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        axios.post("http://localhost:3000/api/user/login", loginData, {
            withCredentials: true
        }).then((res) => {
            setIsLoggedIn(true);
            setUser(res.data.user);
            navigate("/blog-post");
            setErrors({});
        }).catch((err) => {
            setMsg(err.response?.data?.message || 'Something went wrong');
        });
    };

    return (
        <div>
            {msg && <p>{msg}</p>}
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} />
                    {errors.username && <p style={{color: "red"}}>{errors.username}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                    {errors.password && <p style={{color: "red"}}>{errors.password}</p>}
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    )
}
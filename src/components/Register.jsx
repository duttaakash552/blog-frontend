import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function Register() {
    const [user, setUser] = useState({ name: "", email: "", username: "", password: "", confirmPassword: "" });
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!user.name.trim()) {
            setMsg("");
            newErrors.name = "Name is required";
        }

        if (!user.email.trim()) {
            setMsg("");
            newErrors.email = "Email is required";
        }

        if (!user.username.trim()) {
            setMsg("");
            newErrors.username = "Username is required";
        }

        if (!user.password.trim()) {
            setMsg("");
            newErrors.password = "Password is required";
        }

        if (!user.confirmPassword.trim()) {
            setMsg("");
            newErrors.confirmPassword = "Confirm password is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (user.password === user.confirmPassword) {
            await axios.post("http://localhost:3000/api/user/register", user).then((res) => {
                setMsg(res.data.message);
                setUser({
                    name: "",
                    email: "",
                    username: "",
                    password: "",
                    confirmPassword: ""
                });
                setErrors({});
            }).catch((err) => {
                setMsg(err.response.data.message);
            });
        } else {
            setMsg("Passwords do not match");
        }
    };

    return (
        <div>
            {msg && <p>{msg}</p>}
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                    {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" id="confirmPassword" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
                    {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    )
}
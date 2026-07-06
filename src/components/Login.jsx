import { Link } from "react-router-dom"

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <form>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    )
}
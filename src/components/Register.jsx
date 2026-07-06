import { Link } from "react-router-dom"

export default function Register() {
    return (
        <div>
            <h1>Register</h1>
            <form>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" />
                </div>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" id="confirmPassword" />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    )
}
import { Link } from "react-router-dom"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { AuthContext } from "../AuthContext"

export default function Menu() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(
                'http://localhost:3000/api/user/logout',
                {},
                {
                    withCredentials: true
                }
            );

            setIsLoggedIn(false);

            navigate('/login', {
                replace: true
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/blogs">Blogs</Link>
            {!isLoggedIn ? (
                <>
                    <Link to="/login">Login</Link>
                </>
            ) : (
                <>
                    <Link to="/blog-post">Post Blogs</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/my-blog">My Blog</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </>
    );
}
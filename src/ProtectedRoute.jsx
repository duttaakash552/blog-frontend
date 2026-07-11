import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "./AuthContext"

export default function ProtectedRoute({ children }) {
    const { isLoggedIn, loading } = useContext(AuthContext);

    if (loading) {
        return <h2>Loading...</h2>;
    }
    
    return isLoggedIn ? children : <Navigate to="/login" replace />;
}
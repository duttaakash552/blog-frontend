import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(
            'http://localhost:3000/api/user/me',
            {
                withCredentials: true
            }
        )
            .then((res) => {
                setIsLoggedIn(true);
                setUser(res.data.user);
            })
            .catch(() => {
                setIsLoggedIn(false);
                setUser(null);
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
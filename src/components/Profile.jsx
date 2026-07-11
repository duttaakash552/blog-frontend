import { useContext } from "react"

import { AuthContext } from "../AuthContext"

export default function Profile() {
    const { user } = useContext(AuthContext)

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Welcome, {user?.name}!</p>
            <p>Email: {user?.email}</p>
            <p>Username: {user?.username}</p>
        </div>
    )
}
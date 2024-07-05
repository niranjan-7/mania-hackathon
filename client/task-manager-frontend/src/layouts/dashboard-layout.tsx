import * as React from 'react'
import { useUser,useAuth } from "@clerk/clerk-react"
import { Outlet, useNavigate } from "react-router-dom"

export default function DashboardLayout() {
    const { userId, isLoaded } = useAuth()
    const navigate = useNavigate()
    const { isSignedIn, user } = useUser();
    console.log('test', userId)
    console.log('user',isSignedIn,user)
    React.useEffect(() => {
        if (isLoaded && !userId) {
            navigate("/sign-in")
        }
    }, [isLoaded])

    if (!isLoaded) return "Loading..."

    return (
        <Outlet />
    )
}
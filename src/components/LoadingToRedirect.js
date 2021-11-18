import React, {useState, useEffect } from 'react'
import {useHistory } from "react-router-dom"

const LoadingToRedirect = () => {
    const [count, setCount ] = useState(5);
    const navigate = useHistory();
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000)

        count === 0 && navigate.push("/login")
        return () => clearInterval(interval)
    }, [count, navigate])
    return (
        <div>
            <p>Redirecting you in {count} seconds</p>
        </div>
    )
}

export default LoadingToRedirect

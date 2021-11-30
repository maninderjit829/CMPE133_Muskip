import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { logoutInitiate } from '../redux/actions';
const Home = () => {
    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleAuth = () => {
        if(currentUser){
            dispatch(logoutInitiate());
            return toast.success("Logout successfully")
        }
    }

    return (
        <div>
            <h2>Welcome to Muskip</h2>
            <br />
            <button className="btn btn-danger" onClick={handleAuth}>Logout</button>
        </div>
    )
}

export default Home
